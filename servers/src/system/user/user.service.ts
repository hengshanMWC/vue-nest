import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm'
import { Repository, EntityManager } from 'typeorm'
import { instanceToPlain, plainToInstance } from 'class-transformer'
import { genSalt, hash, compare } from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'
import ms from 'ms'

import { ResultData } from 'src/common/utils/result'
import { RedisKeyPrefix } from 'src/common/enums/redis-key-prefix.enum'
import { AppHttpCode } from 'src/common/enums/code.enum'
import { RedisService } from 'src/common/libs/redis/redis.service'

import { validPhone, validEmail } from 'src/common/utils/validate'

import { CreateUserDto } from './dto/create-user.dto'
import { CreateTokenDto } from './dto/create-token.dto'
import { getRedisKey } from 'src/common/utils/helpers'
import { UserType } from 'src/common/enums/common.enum'
import { UserEntity } from 'src/common/entities/db/user/user.entity'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepo: Repository<UserEntity>,
		@InjectEntityManager()
		private readonly userManager: EntityManager,
		private readonly config: ConfigService,
		private readonly redisService: RedisService,
		private readonly jwtService: JwtService
	) {}

	async findOneById(id: string): Promise<UserEntity> {
		const redisKey = getRedisKey(RedisKeyPrefix.USER_INFO, id)
		const result = await this.redisService.hGetAll(redisKey)
		// plainToInstance 去除 password slat
		let user = plainToInstance(UserEntity, result, {
			enableImplicitConversion: true
		})
		if (!user?.id) {
			user = await this.userRepo.findOne({ where: { id } })
			user = plainToInstance(UserEntity, { ...user }, { enableImplicitConversion: true })
			await this.redisService.hmset(
				redisKey,
				instanceToPlain(user),
				ms(this.config.get<string>('jwt.expiresin')) / 1000
			)
		}
		user.password = ''
		user.salt = ''
		return user
	}

	async findOneByAccount(account: string): Promise<UserEntity> {
		return await this.userRepo.findOne({ where: { account } })
	}

	/** 创建用户 */
	async create(dto: CreateUserDto): Promise<ResultData> {
		if (dto.password !== dto.confirmPassword)
			return ResultData.fail(AppHttpCode.USER_PASSWORD_INVALID, '两次输入密码不一致，请重试')
		// 防止重复创建 start
		if (await this.findOneByAccount(dto.account))
			return ResultData.fail(AppHttpCode.USER_CREATE_EXISTING, '帐号已存在，请调整后重新注册！')
		if (await this.userRepo.findOne({ where: { phoneNum: dto.phoneNum } }))
			return ResultData.fail(AppHttpCode.USER_CREATE_EXISTING, '当前手机号已存在，请调整后重新注册')
		if (await this.userRepo.findOne({ where: { email: dto.email } }))
			return ResultData.fail(AppHttpCode.USER_CREATE_EXISTING, '当前邮箱已存在，请调整后重新注册')
		// 防止重复创建 end
		const salt = await genSalt()
		dto.password = await hash(dto.password, salt)
		// plainToInstance  忽略转换 @Exclude 装饰器
		const user = plainToInstance(UserEntity, { salt, ...dto }, { ignoreDecorators: true })
		const result = await this.userManager.transaction(async (transactionalEntityManager) => {
			return await transactionalEntityManager.save<UserEntity>(user)
		})
		return ResultData.ok(instanceToPlain(result))
	}

	/**
	 * 登录
	 * account 有可能是 帐号/手机/邮箱
	 */
	async login(account: string, password: string): Promise<ResultData> {
		let user = null
		if (validPhone(account)) {
			// 手机登录
			user = await this.userRepo.findOne({ where: { phoneNum: account } })
		} else if (validEmail(account)) {
			// 邮箱
			user = await this.userRepo.findOne({ where: { email: account } })
		} else {
			// 帐号
			user = await this.findOneByAccount(account)
		}
		if (!user) return ResultData.fail(AppHttpCode.USER_PASSWORD_INVALID, '帐号或密码错误')
		const checkPassword = await compare(password, user.password)
		if (!checkPassword) return ResultData.fail(AppHttpCode.USER_PASSWORD_INVALID, '帐号或密码错误')
		if (user.status === 0)
			return ResultData.fail(AppHttpCode.USER_ACCOUNT_FORBIDDEN, '您已被禁用，如需正常使用请联系管理员')
		// 生成 token
		const data = this.genToken({ id: user.id })
		return ResultData.ok(data)
	}

	async updateToken(userId: string): Promise<ResultData> {
		const data = this.genToken({ id: userId })
		return ResultData.ok(data)
	}

	/**
	 * 更新或重置用户密码
	 * @reset 是否重置, false 则使用传入的 password 更新
	 */
	async updatePassword(userId: string, password: string, reset: boolean, currUser: UserEntity): Promise<ResultData> {
		const existing = await this.userRepo.findOne({ where: { id: userId } })
		if (!existing)
			return ResultData.fail(AppHttpCode.USER_NOT_FOUND, `用户不存在或已删除，${reset ? '重置' : '更新'}失败`)
		if (existing.type === UserType.SUPER_ADMIN && currUser.type === UserType.ORDINARY_USER) {
			return ResultData.fail(AppHttpCode.USER_FORBIDDEN_UPDATE, '您不可修改超管信息喔')
		}
		const newPassword = reset ? this.config.get<string>('user.initialPassword') : password
		const user = {
			id: userId,
			password: await hash(newPassword, existing.salt)
		}
		const { affected } = await this.userManager.transaction(async (transactionalEntityManager) => {
			return await transactionalEntityManager.update<UserEntity>(UserEntity, userId, user)
		})
		if (!affected) ResultData.fail(AppHttpCode.SERVICE_ERROR, `${reset ? '重置' : '更新'}失败，请稍后重试`)
		return ResultData.ok()
	}

	/** 更新用户信息 */
	async update(dto: UpdateUserDto, currUser: UserEntity): Promise<ResultData> {
		const existing = await this.findOneById(dto.id)
		if (!existing) return ResultData.fail(AppHttpCode.USER_NOT_FOUND, '当前用户不存在或已删除')
		if (existing.type === UserType.SUPER_ADMIN && currUser.type === UserType.ORDINARY_USER) {
			return ResultData.fail(AppHttpCode.USER_FORBIDDEN_UPDATE, '您不可修改超管信息喔')
		}
		const userInfo = instanceToPlain(dto)
		delete userInfo.roleIds
		const { affected } = await this.userManager.transaction(async (transactionalEntityManager) => {
			return await transactionalEntityManager.update<UserEntity>(UserEntity, dto.id, userInfo)
		})
		if (!affected) ResultData.fail(AppHttpCode.SERVICE_ERROR, '更新失败，请稍后重试')

		await this.redisService.del(getRedisKey(RedisKeyPrefix.USER_INFO, dto.id))
		// redis 更新用户信息
		return ResultData.ok()
	}

	/** 查询单个用户 */
	async findOne(id: string): Promise<ResultData> {
		const user = await this.findOneById(id)
		if (!user) return ResultData.fail(AppHttpCode.USER_NOT_FOUND, '该用户不存在或已删除')
		return ResultData.ok(instanceToPlain(user))
	}

	/**
	 * 生成 token 与 刷新 token
	 * @param payload
	 * @returns
	 */
	genToken(payload: { id: string }): CreateTokenDto {
		const accessToken = `Bearer ${this.jwtService.sign(payload)}`
		const refreshToken = this.jwtService.sign(payload, {
			expiresIn: this.config.get('jwt.refreshExpiresIn')
		})
		return { accessToken, refreshToken }
	}

	/**
	 * 生成刷新 token
	 */
	refreshToken(id: string): string {
		return this.jwtService.sign({ id })
	}

	/** 校验 token */
	verifyToken(token: string): string {
		try {
			if (!token) return null
			const id = this.jwtService.verify(token.replace('Bearer ', ''))
			return id
		} catch (error) {
			return null
		}
	}
}

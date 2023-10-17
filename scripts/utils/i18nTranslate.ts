import { translate } from '@vitalets/google-translate-api'
import type { TranslateOptions } from '@vitalets/google-translate-api/src/types'
type Value = string | NestedObject

export interface NestedObject {
	[key: string]: Value
}

type JsonObject = Record<string, string>
const flattenObject = (obj: NestedObject, prefix = ''): JsonObject => {
	let result: JsonObject = {}
	for (const key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			const nestedKey: string = prefix.length > 0 ? `${prefix}/${key}` : key
			if (typeof obj[key] === 'object' && obj[key] !== null) {
				const nestedObj = flattenObject(obj[key] as NestedObject, nestedKey)
				result = { ...result, ...nestedObj }
			} else {
				result[nestedKey] = obj[key] as string
			}
		}
	}
	return result
}

const unflattenObject = (obj: JsonObject) => {
	const result: NestedObject = {}
	for (const key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			const nestedKeys = key.split('/')
			let nestedObj: NestedObject = result
			for (let i = 0; i < nestedKeys.length; i++) {
				const nestedKey = nestedKeys[i]
				if (!Object.prototype.hasOwnProperty.call(nestedObj, nestedKey)) {
					nestedObj[nestedKey] = {}
				}
				if (i === nestedKeys.length - 1) {
					nestedObj[nestedKey] = obj[key]
				}
				nestedObj = nestedObj[nestedKey] as NestedObject
			}
		}
	}
	return result
}

const googleTranslator = (text: string, translateOptions: TranslateOptions) =>
	translate(text, translateOptions)
type Chunk = Array<{ key: string; value: string }>

export interface Options {
	// 传目标数据是增量，不传是全量
	targetJson?: NestedObject
}
// 定义翻译方法
const translateRun = async (
	inputJson: NestedObject,
	options: Options | null,
	translateOptions: TranslateOptions
) => {
	const { targetJson } = options || {}
	const forInputJson = flattenObject(inputJson)
	const forTargetJson = targetJson ? flattenObject(targetJson) : {}
	let chunkValuesLength = 0
	let chunk: Chunk = []
	const chunks: Chunk[] = []
	const sourceKeyValues = Object.entries(forInputJson)
	sourceKeyValues.forEach(([key, value]) => {
		// 目标json有数据则跳过翻译
		if (!forTargetJson[key]) {
			const valueLength = value.length as number
			// Google 翻译单次最大字符长度 5000 字, 5 为占位分隔符长度
			if (chunkValuesLength + valueLength + 5 >= 5000) {
				chunks.push(chunk)
				chunkValuesLength = 0
				chunk = []
			} else {
				chunk.push({ key, value })
				chunkValuesLength += valueLength + 5
			}
		}
	})
	if (chunk.length > 0) {
		// 遍历完后检查不满 5000 字符的遗留
		chunks.push(chunk)
		chunkValuesLength = 0
		chunk = []
	}
	const resultJson: JsonObject = {}
	for (let i = 0; i < chunks.length; i++) {
		const chunk = chunks[i]
		const mergeText = chunk.map((v) => v.value).join('\n###\n') // 合并文案
		const { text } = await googleTranslator(mergeText, translateOptions)
		const resultValues = text.split(/\n *# *# *# *\n/).map((v) => v.trim()) // 拆分文案
		if (chunk.length !== resultValues.length) {
			throw new Error('翻译前文案碎片长度和翻译后的不一致')
		}
		chunk.forEach(({ key }, index) => {
			resultJson[key] = resultValues[index]
		})
	}
	return unflattenObject({
		...forTargetJson,
		...resultJson
	})
}

export { translateRun }

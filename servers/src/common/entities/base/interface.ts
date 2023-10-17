export interface BaseDataApi {
	id: string
	isDeleted: boolean
	createdBy: string
	updatedBy: string
	createdAt: Date
	updatedAt?: Date
}

export type BaseDataKeyList = keyof BaseDataApi

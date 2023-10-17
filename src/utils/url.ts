import { isString, isArray, pick } from 'lodash-es'

/**
 * 传入多个相同key，采用最后一个
 * @param {string|string[]} query 可选
 * @returns
 */
export function getURLSearchParams(
	query: string | string[]
): string | string[] | Record<string, string> {
	const searchParams = new URLSearchParams(window.location.search).entries()
	const result = [...searchParams].reduce((obj: Record<string, string>, curr) => {
		obj[curr[0]] = curr[1]
		return obj
	}, {})

	if (isString(query)) {
		return result[query]
	}

	if (isArray(query)) {
		return pick(result, query)
	}

	return result
}

import { isArray, isString, pick } from 'lodash-es'

export function getURLSearchParams(
  query: string | string[],
): string | string[] | Record<string, string> {
  const searchParams = new URLSearchParams(window.location.search).entries()
  const result = [...searchParams].reduce(
    (obj: Record<string, string>, curr) => {
      obj[curr[0]] = curr[1]
      return obj
    },
    {},
  )

  if (isString(query)) return result[query]

  if (isArray(query)) return pick(result, query)

  return result
}

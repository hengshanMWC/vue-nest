export function filterEmptyValues(
  obj: Record<string, any>,
): Record<string, any> {
  const result: Record<string, any> = {}

  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key) && obj[key] !== '')
      result[key] = obj[key]
  }

  return result
}

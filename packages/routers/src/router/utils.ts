type ChildrenGroup = Readonly<Record<string, string>>

export function routerMerge<T extends ChildrenGroup, V extends string>(base: V, childrenGroup: T) {
  const result = {}
  Object.keys(childrenGroup).forEach((key) => {
    result[key] = `${base}/${childrenGroup[key]}`
  })
  return result as BaseRouterMerge<T, V>
}

export type BaseRouterMerge<T extends Record<string, string>, V extends string> = {
  [K in keyof T]: `${V}/${T[K]}`
}

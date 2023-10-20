import type { DeepReadonly } from '@vue-nest/base'

export interface RouterDataApi<K extends string> {
  base: string
  childrenGroup: Record<K, string>
}

export type RouterDataStructure<K extends string> = DeepReadonly<RouterDataApi<K>>

export function createRouterProxy<K extends string>(routerData: RouterDataApi<K>): RouterDataStructure<K> {
  const base = routerData.base
  const childrenGroup = new Proxy(routerData.childrenGroup, {
    get(target, propKey: any, receiver) {
      const value = target[propKey]
      if (value) {
        return `${base}/${value}`
      }
      else {
        return Reflect.get(target, propKey, receiver)
      }
    },
    set() {
      return false
    },
  })
  return {
    base,
    childrenGroup,
  } as const as RouterDataStructure<K>
}

import type { UnwrapNestedRefs } from 'vue'

export function useResetReactive<T extends object>(value: T): [UnwrapNestedRefs<T>, () => void] {
  const data = reactive<T>(value)
  function reset() {
    Object.entries(value).forEach(([key, value]) => {
      (data as any)[key] = value
    })
  }
  return [data, reset]
}

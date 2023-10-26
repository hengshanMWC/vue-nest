import type { UnwrapNestedRefs } from 'vue'

export function useResetData<T extends object>(obj: T): [UnwrapNestedRefs<T>, (newData?: Partial<T>) => void, T] {
  const value: T = Object.create(obj)
  const data = reactive<T>(value)
  function reset(newData: Partial<T> = obj) {
    Object.assign(data, newData)
  }
  return [data, reset, value]
}

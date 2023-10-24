import type { UnwrapRef } from 'vue'

export function useResetRef<T = any>(value: T) {
  const data = ref<T>(value)
  function reset() {
    data.value = value as UnwrapRef<T>
  }
  return [data, reset]
}

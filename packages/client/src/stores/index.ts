import { type Pinia, createPinia } from 'pinia'

let _store: Pinia
function createStore() {
  return _store = createPinia()
}

function getStore() {
  return _store
}

export {
  getStore,
  createStore,
}

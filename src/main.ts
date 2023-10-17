import 'normalize.css/normalize.css'
import './styles/tailwind.css'
import './styles/index.css'

import App from './App.vue'
import router from './router'
import createStore from './stores'
import { createLocales } from './locales'

const app = createApp(App)

app.use(router).use(createStore()).use(createLocales())

// 关于 tailwind 的 preflight 样式
const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

app.mount('#app')

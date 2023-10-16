import 'normalize.css/normalize.css'
import './styles/tailwind.css';
import './styles/index.scss'


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores';
import { i18n } from './locales';

const app = createApp(App)

app.use(router).use(store).use(i18n)

// 关于 tailwind 的 preflight 样式
const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

app.mount('#app')

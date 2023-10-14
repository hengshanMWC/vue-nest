import { fileURLToPath, URL } from 'node:url'
import svgLoader from 'vite-svg-loader'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'servers/views',
  },
  plugins: [
    vue(),
    /** 将 SVG 静态图转化为 Vue 组件 */
    svgLoader(),
    // 需自动加载组件
    AutoImport({
      resolvers: [NaiveUiResolver()]
    }),
    Components({
      resolvers: [NaiveUiResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    cors: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8081',
        ws: true,
        changeOrigin: true
      }
    }
  },
})

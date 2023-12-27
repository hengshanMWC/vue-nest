import { URL, fileURLToPath } from 'node:url'
import svgLoader from 'vite-svg-loader'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import type { ConfigEnv } from 'vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import viteCompression from 'vite-plugin-compression'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

// https://vitejs.dev/config/
export default defineConfig((env: ConfigEnv) => {
  const production = env.mode === 'production'
  return {
    build: {
      outDir: fileURLToPath(new URL('../server/views', import.meta.url)),
      rollupOptions: {
        output: {
          // 禁用 eval
          intro: 'self',
        },
      },
    },
    plugins: [
      vue(),
      /** 将 SVG 静态图转化为 Vue 组件 */
      svgLoader(),
      // 自动按需加载
      AutoImport({
        imports: ['vue'],
        dts: './typings/auto-imports.d.ts',
      }),
      Components({
        resolvers: [NaiveUiResolver()],
        dts: './typings/components.d.ts',
      }),
      // https://juejin.cn/post/7267184905187999759
      VueI18nPlugin({
        include: [
          fileURLToPath(new URL('./src/locales/lang/**.json', import.meta.url)),
        ],
        runtimeOnly: false,
        jitCompilation: true,
      }),
      ...(production
        ? [
            viteCompression({
              algorithm: 'gzip', // 压缩文件为 br 类型
              threshold: 1024 * 10, // 对大于 10Kb 的文件进行压缩
            }),
          ]
        : []),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    optimizeDeps: {
      exclude: ['vue', 'axios', 'vue-router', 'vue-i18n'],
      include: ['@lib/base', '@lib/routers'],
    },
    server: {
      cors: true,
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:8081',
          ws: true,
          changeOrigin: true,
        },
      },
    },
  }
})

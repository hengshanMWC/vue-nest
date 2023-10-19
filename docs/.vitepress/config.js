import path from 'node:path'
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'vue-next',
  description: 'pkgs模板',
  outDir: path.join(__dirname, '../dist'),
  base: '/vue-next/docs/dist/',
  themeConfig: {
    siteTitle: 'vue-next',
    sidebar: [
      {
        text: '介绍',
        collapsible: true,
        items: [
          {
            text: 'demo',
            link: '/',
          },
        ],
      },
    ],
  },
})

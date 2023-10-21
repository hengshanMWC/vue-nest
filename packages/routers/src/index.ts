import { compile } from 'path-to-regexp'

export * from './router'

export function generatePath(routePath, params) {
  const toPath = compile(routePath)

  try {
    const path = toPath(params)
    return path
  }
  catch (error) {
    console.error('生成路由路径失败:', error.message)
    return null
  }
}

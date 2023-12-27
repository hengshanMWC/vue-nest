/// <reference types="vite/client" />
interface ViteEnv {
  VITE_APP_BASE_API_URL: string
  VITE_APP_SERVER_URL: string
  VITE_APP_STATIC_URL: string
  VITE_APP_API_REQUEST_TIMEOUT: number
}

declare global {
  const ImportMeta: {
    env: ViteEnv
  }
}

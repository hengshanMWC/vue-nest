/// <reference types="vite/client" />
interface ViteEnv {
  VITE_APP_BASE_API_URL: string
  VITE_APP_DOWNLOAD_URL: string
  VITE_APP_API_REQUEST_TIMEOUT: number
}

declare global {
  const ImportMeta: {
    env: ViteEnv
  }
}

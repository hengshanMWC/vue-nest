const env = import.meta.env

const config = {
  api: {
    baseUrl: `${env.VITE_APP_BASE_API_URL}`,
    serverUrl: `${env.VITE_APP_SERVER_URL}`,
    staticUrl: `${env.VITE_APP_STATIC_URL}`,
  },
  request: {
    timeout: `${env.VITE_APP_API_REQUEST_TIMEOUT}`,
  },
}

export default config

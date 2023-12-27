import configuration from '../config'

export const APP_FILE_LOCATION = './public'

const config = configuration()

export const DEFAULT_AVATAR = `${
  config.app.file.domain + config.app.file.serveRoot
}/images/default_avatar.png`

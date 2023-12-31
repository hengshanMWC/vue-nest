import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { load } from 'js-yaml'

const configFileNameObj = {
  development: 'dev',
  test: 'test',
  production: 'prod',
  docker: 'docker',
}

const env = process.env.NODE_ENV
let config: any
export default () => {
  return (
    config ||
    (config = load(
      readFileSync(join(__dirname, `./${configFileNameObj[env]}.yml`), 'utf8'),
    ) as Record<string, any>)
  )
}

import { NestedObject, translateRun } from './utils/i18nTranslate'
import { readJsonFiles } from "./utils/readJsons"
import { HttpProxyAgent } from 'http-proxy-agent';
import { DEFAULT_LOCALE, LEGAL_LOCALES, LOCALES_ENUM } from '../src/constant';
import { writeFile } from 'fs/promises';
import { join } from 'path';
const agent = new HttpProxyAgent('http://127.0.0.1:7890');

// 读取 json 文案文件
const sourceLocalePath = join(__dirname, '../src/locales/lang', DEFAULT_LOCALE)

const jsonFIlePathReplaceRegExp = new RegExp(DEFAULT_LOCALE, 'g')
async function main () {
  const jsonContentList = await readJsonFiles(sourceLocalePath)
  const taskList = LEGAL_LOCALES
    .filter(locale => locale !== DEFAULT_LOCALE)
    .map(locale => runTranslate(locale, jsonContentList))
  await Promise.all(taskList)
}

async function runTranslate (targetLocale: LOCALES_ENUM, jsonContentList: Record<string, NestedObject>) {
  return Object.keys(jsonContentList).map(async key =>  {
    const translateRunJson = await translateRun(jsonContentList[key], {
      from: DEFAULT_LOCALE,
      to: targetLocale,
      fetchOptions: {agent}
    })
    return writeFile(key.replace(jsonFIlePathReplaceRegExp, targetLocale), JSON.stringify(translateRunJson, null, 2))
  })
}

main()
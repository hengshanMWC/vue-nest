import { NestedObject, translateRun } from './utils/i18nTranslate'
import { readJsonFiles } from "./utils/readJsons"
import { HttpProxyAgent } from 'http-proxy-agent';
import { DEFAULT_LOCALE, LEGAL_LOCALES, LOCALES_ENUM } from '../src/constant';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { TranslateOptions } from '@vitalets/google-translate-api/src/types';

type Agent = TranslateOptions['fetchOptions']['agent']
async function translatesRun (
  fromLocale: string, 
  sourceLocalePath: string, 
  toLocaleList: string[], 
  agent?: Agent
) {
  const jsonContentList = await readJsonFiles(sourceLocalePath)
  const taskList = toLocaleList
    .filter(locale => locale !== DEFAULT_LOCALE)
    .map(locale => rollTranslate(fromLocale, locale, jsonContentList, agent))
  await Promise.all(taskList)
}

async function rollTranslate (fromLocale: string, targetLocale: string, jsonContentList: Record<string, NestedObject>, agent?: Agent) {
  const jsonFIlePathReplaceRegExp = new RegExp(fromLocale, 'g')
  return Object.keys(jsonContentList).map(async key =>  {
    const targetPath = key.replace(jsonFIlePathReplaceRegExp, targetLocale)
    const targetContent = await readFile(targetPath, 'utf8')
    const targetJson: NestedObject = JSON.parse(targetContent);
    const translateRunJson = await translateRun(jsonContentList[key], {
      targetJson
    }, {
      from: fromLocale,
      to: targetLocale,
      fetchOptions: {agent}
    })
    return writeFile(targetPath, JSON.stringify(translateRunJson, null, 2))
  })
}


const agent = new HttpProxyAgent('http://127.0.0.1:7890');
// 读取 json 文案文件
const sourceLocalePath = join(__dirname, '../src/locales/lang', DEFAULT_LOCALE)

translatesRun(
  DEFAULT_LOCALE,
  sourceLocalePath,
  LEGAL_LOCALES.filter(locale => locale !== DEFAULT_LOCALE),
  agent
)
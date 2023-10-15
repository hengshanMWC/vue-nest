import { readdir, readFile } from 'fs/promises';
import { extname, join } from 'path';
import { NestedObject } from './i18nTranslate';

export async function readJsonFiles(directoryPath: string) {
  const files = await readdir(directoryPath);
  const result: Record<string,NestedObject> = {

  }

  for (const file of files) {
    const filePath = join(directoryPath, file);

    // 检查文件是否是 JSON 文件
    if (extname(file) === '.json') {
      // 读取 JSON 文件内容
      try {
        const data = await readFile(filePath, 'utf8');
        const jsonContent = JSON.parse(data);
        result[filePath] = jsonContent
      } catch (parseError) {
        console.log('Error parsing JSON in ' + file + ':', parseError);
      }
    }
  }
  return result
}

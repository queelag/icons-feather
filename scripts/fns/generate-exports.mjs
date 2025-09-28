import { getSnakeCaseString } from '@aracna/core'
import { appendFile, readFile, writeFile } from 'fs/promises'
import { glob } from 'glob'
import { basename, extname } from 'path'

export async function generateExports() {
  await writeFile('src/assets.ts', '')

  for (let path of await glob('assets/*.svg')) {
    let name, cname, svg

    name = basename(path).replace(extname(path), '')
    cname = 'ICON_F_' + getSnakeCaseString(name).toUpperCase()
    svg = await readFile(path)

    await appendFile('src/assets.ts', `export const ${cname}: string = \`${svg}\`\n`)
  }
}

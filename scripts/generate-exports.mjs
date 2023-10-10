import { getSnakeCaseString } from '@aracna/core'
import { appendFile, readFile, writeFile } from 'fs/promises'
import { glob } from 'glob'

await writeFile('src/index.ts', '')

for (let asset of await glob('assets/*.svg')) {
  let name, cname, svg

  name = asset.replace('assets/', '').replace('.svg', '')
  cname = 'ICON_FEATHER_' + getSnakeCaseString(name).toUpperCase()
  svg = await readFile(asset)

  await appendFile('src/index.ts', `export const ${cname}: string = \`${svg}\`\n`)
}

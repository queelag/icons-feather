import { getSnakeCaseString } from '@aracna/core'
import { mkdir, readFile, rm, writeFile } from 'fs/promises'
import { glob } from 'glob'

await rm('src/assets', { force: true, recursive: true })
await mkdir('src/assets')

for (let asset of await glob('assets/*.svg')) {
  let name, cname, svg

  name = asset.replace('assets/', '').replace('.svg', '')
  cname = 'ICON_F_' + getSnakeCaseString(name).toUpperCase()
  svg = await readFile(asset)

  await writeFile(`src/assets/${name}.ts`, `export const ${cname}: string = \`${svg}\``)
}

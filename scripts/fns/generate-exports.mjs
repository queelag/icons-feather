import { getSnakeCaseString } from '@aracna/core'
import { mkdir, readFile, rm, writeFile } from 'fs/promises'
import { glob } from 'glob'
import { basename, extname } from 'path'

export async function generateExports() {
  await rm('src/assets', { force: true, recursive: true })
  await mkdir('src/assets')

  for (let path of await glob('assets/*.svg')) {
    let name, cname, svg

    name = basename(path).replace(extname(path), '')
    cname = 'ICON_F_' + getSnakeCaseString(name).toUpperCase()
    svg = await readFile(path)

    await writeFile(`src/assets/${name}.ts`, `export const ${cname}: string = \`${svg}\``)
  }
}

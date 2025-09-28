import { getKebabCaseString } from '@aracna/core'
import { readFile } from 'fs/promises'
import { describe, expect, it } from 'vitest'
import * as ICONS from '../src/assets'

describe('index', () => {
  it('contains the correct exports', async () => {
    for (let [name, value] of Object.entries(ICONS)) {
      let fname: string, file: string

      fname = getKebabCaseString(name.replace('ICON_F_', '').toLowerCase()) + '.svg'
      file = await readFile(`./assets/${fname}`, { encoding: 'utf8' })

      expect(file).toBe(value)
    }
  })
})

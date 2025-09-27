import { cp, rm } from 'fs/promises'
import { bundle } from './fns/bundle.mjs'
import { emitDeclarations } from './fns/emit-declarations.mjs'
import { generateExports } from './fns/generate-exports.mjs'
import { writeDistPackageJSON } from './fns/write-dist-package-json.mjs'

await rm('dist', { force: true, recursive: true })

await generateExports()
await bundle()
await emitDeclarations()
await writeDistPackageJSON()

await cp('LICENSE', 'dist/LICENSE')
await cp('README.md', 'dist/README.md')

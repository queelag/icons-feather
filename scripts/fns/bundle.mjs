import { build } from 'esbuild'
import { glob } from 'glob'

/** @type {import('esbuild').BuildOptions} */
const options = {
  logLevel: 'info',
  minify: true,
  packages: 'external',
  platform: 'neutral',
  treeShaking: true
}

export async function bundle() {
  await Promise.all(
    [
      /**
       * ESM
       */
      build({
        ...options,
        entryPoints: await glob('./src/**/*.ts'),
        format: 'esm',
        outdir: 'dist'
      }),
      /**
       * CJS
       */
      build({
        ...options,
        bundle: true,
        entryPoints: ['src/index.ts'],
        format: 'cjs',
        outfile: 'dist/index.cjs'
      })
    ]
      /**
       * Assets
       */
      .concat(
        (await glob('./src/assets/**/*.ts')).map((asset) =>
          Promise.all([
            /**
             * CJS
             */
            build({
              ...options,
              bundle: true,
              entryPoints: [asset],
              format: 'cjs',
              outfile: asset.replace('src', 'dist').replace('.ts', '.cjs')
            }).catch(() => process.exit(1))
          ])
        )
      )
  ).catch(() => process.exit(1))
}

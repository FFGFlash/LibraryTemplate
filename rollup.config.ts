import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'
import terser from '@rollup/plugin-terser'
import { defineConfig } from 'rollup'

const tsconfig = './tsconfig.build.json'

export default defineConfig([
  {
    input: 'src/index.ts',
    output: { file: 'dist/index.cjs', format: 'cjs', exports: 'auto' },
    plugins: [nodeResolve(), commonjs(), json(), typescript({ tsconfig })],
    external: ['fs', 'path', 'dotenv'],
  },
  {
    input: 'src/index.ts',
    output: { file: 'dist/index.js', format: 'esm' },
    plugins: [nodeResolve(), commonjs(), json(), typescript({ tsconfig })],
  },
  {
    input: 'src/index.ts',
    output: { file: 'dist/index.umd.js', format: 'umd', name: 'MyLibrary' },
    plugins: [
      nodeResolve({ browser: true }),
      commonjs(),
      json(),
      typescript({ tsconfig }),
      terser(),
    ],
  },
])

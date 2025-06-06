import { defineConfig } from 'tsup'

export default defineConfig({
    format: ['cjs', 'esm'],
    entry: ['./src/**/**.ts', '!src/container/**'],
    dts: true,
    shims: true,
    skipNodeModulesBundle: true,
    clean: true,
    external: ["./src/container/**"]
})
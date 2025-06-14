import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['./src/**/**.ts'],
  format: ['esm'],          
  target: 'es2022',
  dts: true,                
  splitting: true,         
  sourcemap: true,
  clean: true,
  outDir: 'dist',
  external: ["@nova-ts/context"]
});

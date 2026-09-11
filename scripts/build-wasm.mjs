import * as esbuild from 'esbuild-wasm';
import process from 'process';
import builtins from 'builtin-modules';

const prod = (process.argv[2] === 'production');

await esbuild.initialize({});

console.log('Building with esbuild-wasm (prod=' + prod + ')...');

const result = await esbuild.build({
  entryPoints: ['main.ts'],
  bundle: true,
  external: [
    'obsidian',
    'electron',
    '@codemirror/autocomplete',
    '@codemirror/collab',
    '@codemirror/commands',
    '@codemirror/language',
    '@codemirror/lint',
    '@codemirror/search',
    '@codemirror/state',
    '@codemirror/view',
    '@lezer/common',
    '@lezer/highlight',
    '@lezer/lr',
    ...builtins,
  ],
  format: 'cjs',
  target: 'es2018',
  logLevel: 'info',
  sourcemap: prod ? false : 'inline',
  treeShaking: true,
  outfile: 'main.js',
  minify: prod,
});

console.log('Build complete.', result.errors.length, 'errors,', result.warnings.length, 'warnings');
process.exit(0);
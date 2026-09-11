import https from 'https';
import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';

const version = '0.21.5';
const url = `https://registry.npmjs.org/esbuild-wasm/-/esbuild-wasm-${version}.tgz`;
const tmpTgz = path.join(process.cwd(), 'esbuild-wasm.tgz');
const tmpDir = path.join(process.cwd(), 'node_modules', '_tmp-wasm');
const destDir = path.join(process.cwd(), 'node_modules', 'esbuild-wasm');

console.log('Downloading', url);

function download() {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(tmpTgz);
    https.get(url, (res) => {
      if (res.statusCode === 302 || res.statusCode === 301) {
        https.get(res.headers.location, (r2) => {
          r2.pipe(file);
          file.on('finish', () => { file.close(); resolve(); });
        }).on('error', reject);
      } else {
        res.pipe(file);
        file.on('finish', () => { file.close(); resolve(); });
      }
    }).on('error', reject);
  });
}

await download();
console.log('Downloaded. Extracting...');
fs.mkdirSync(tmpDir, { recursive: true });
execFileSync('tar', ['-xzf', tmpTgz, '-C', tmpDir], { stdio: 'inherit' });
fs.rmSync(destDir, { recursive: true, force: true });
fs.renameSync(path.join(tmpDir, 'package'), destDir);
fs.rmSync(tmpDir, { recursive: true, force: true });
fs.unlinkSync(tmpTgz);
console.log('Done. Files:', fs.readdirSync(destDir));
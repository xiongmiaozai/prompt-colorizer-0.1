import https from 'https';
import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';

const version = '0.21.5';
const url = `https://registry.npmjs.org/@esbuild/win32-x64/-/win32-x64-${version}.tgz`;
const tmpTgz = path.join(process.cwd(), 'win32-x64.tgz');
const tmpDir = path.join(process.cwd(), 'node_modules', '@esbuild', '_tmp-extract');
const destDir = path.join(process.cwd(), 'node_modules', '@esbuild', 'win32-x64');

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
// 用系统 tar 解压
execFileSync('tar', ['-xzf', tmpTgz, '-C', tmpDir], { stdio: 'inherit' });

// 解压出 package/ 目录，移到 win32-x64/
fs.rmSync(destDir, { recursive: true, force: true });
fs.renameSync(path.join(tmpDir, 'package'), destDir);
fs.rmSync(tmpDir, { recursive: true, force: true });
fs.unlinkSync(tmpTgz);

console.log('Done. @esbuild/win32-x64 installed at', destDir);
console.log('Files:', fs.readdirSync(destDir));
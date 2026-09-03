import { readFileSync, writeFileSync } from "fs";

const targetVersion = process.env.npm_package_version;
const manifestPath = "manifest.json";
const versionsPath = "versions.json";

// 读取并更新 manifest.json
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const minAppVersion = manifest.minAppVersion;
manifest.version = targetVersion;
writeFileSync(manifestPath, JSON.stringify(manifest, null, "\t"));

// 更新 versions.json
const versions = JSON.parse(readFileSync(versionsPath, "utf8"));
versions[targetVersion] = minAppVersion;
writeFileSync(versionsPath, JSON.stringify(versions, null, "\t"));

console.log(`版本已更新: ${targetVersion} (minAppVersion: ${minAppVersion})`);

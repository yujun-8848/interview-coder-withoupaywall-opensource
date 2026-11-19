#!/usr/bin/env node
// 校验 electron-dist/ 里的离线二进制是否齐全。
// 目的：electron-builder 拿到 electronDist 后会直接解压本地 zip；如果 zip 缺失，
// 它会退回去下载（镜像慢时会以 EOF 失败），所以打包前先在这里说清楚缺什么。
import { existsSync } from "node:fs"
import { createRequire } from "node:module"
import path from "node:path"
import { fileURLToPath } from "node:url"

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(here, "..")
const distDir = path.join(root, "electron-dist")
const require = createRequire(import.meta.url)

const targets = process.argv.slice(2)
if (targets.length === 0) {
  console.error("用法: node tools/verify-electron-dist.mjs <platform-arch> [...], 例如 darwin-arm64 win32-x64")
  process.exit(2)
}

let version
try {
  version = require(path.join(root, "node_modules", "electron", "package.json")).version
} catch {
  console.error("找不到 node_modules/electron，请先 npm install")
  process.exit(1)
}

if (!existsSync(distDir)) {
  console.error(`缺少目录 ${distDir}，请把 electron-v${version}-<platform>-<arch>.zip 放进去`)
  process.exit(1)
}

const missing = targets
  .map((target) => `electron-v${version}-${target}.zip`)
  .filter((file) => !existsSync(path.join(distDir, file)))

if (missing.length > 0) {
  console.error(`electron-dist 缺少（electron v${version}）: ${missing.join(", ")}`)
  console.error(`把这些文件放到 ${distDir} 后重试`)
  process.exit(1)
}

console.log(`离线 electron 包就绪（v${version}）: ${targets.join(", ")}`)

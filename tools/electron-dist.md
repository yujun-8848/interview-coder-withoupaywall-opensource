# electron-dist

离线打包用的 Electron 二进制缓存。`npm run package-mac:offline` / `package-win:offline` /
`package-linux:offline` 会通过 `--config.electronDist=electron-dist` 让 electron-builder
直接解压这里的 zip，完全不联网。

需要的文件名形如 `electron-v<版本>-<平台>-<架构>.zip`，版本取 `node_modules/electron/package.json`
（当前 v29.4.6）：

| 目标 | 文件名 |
| --- | --- |
| macOS Apple Silicon | `electron-v29.4.6-darwin-arm64.zip` |
| macOS Intel | `electron-v29.4.6-darwin-x64.zip` |
| Windows x64 | `electron-v29.4.6-win32-x64.zip` |
| Linux x64 | `electron-v29.4.6-linux-x64.zip` |

zip 来源（任选其一）：

- 从本机缓存复制：`~/Library/Caches/electron/`（macOS）或 `%LOCALAPPDATA%\electron\Cache\`（Windows）
- 从镜像下载：`https://cdn.npmmirror.com/binaries/electron/<版本>/electron-v<版本>-<平台>-<架构>.zip`

> 整个 `electron-dist/` 目录都在 `.gitignore` 里（三个 zip 约 290 MB），只留在本地；
> 换机器时把 zip 拷到这个目录即可，不需要经过 git。

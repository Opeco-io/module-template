import { watch } from "rollup"
import config from "./rollup.config.js"
import os from "os"
import path from "path"
import { fileURLToPath } from "url"
import fs from "fs"
import pkg from "./package.json" assert { type: "json" }

const platform = os.platform()
let appDataDir, moduleDir
switch (platform) {
  case "win32":
    appDataDir = process.env.APPDATA
    break
  case "darwin":
    appDataDir = path.join(os.homedir(), "Library", "Application Support")
    break
  case "linux":
    appDataDir = path.join(os.homedir(), ".config")
    break
  default:
    throw new Error(`Unsupported platform: ${platform}`)
}
moduleDir = path.join(appDataDir, "opeco", "modules", "@local", pkg.name)

watch(config).on("event", (event) => {
  if (event.code === "BUNDLE_END") {
    if (!fs.existsSync(moduleDir)) {
      fs.mkdirSync(moduleDir, {
        recursive: true,
      })
    }
    fs.copyFileSync(
      path.join(path.dirname(fileURLToPath(import.meta.url)), "package.json"),
      path.join(moduleDir, "package.json")
    )
    fs.copyFileSync(
      path.join(
        path.dirname(fileURLToPath(import.meta.url)),
        "dist",
        "index.cjs"
      ),
      path.join(moduleDir, "index.cjs")
    )
  }
})

import svelte from "rollup-plugin-svelte"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import autoPreprocess from "svelte-preprocess"
import postcss from "rollup-plugin-postcss"

export default {
  input: "src/index.mjs",
  output: {
    file: "dist/index.mjs",
    format: "esm",
    sourcemap: true,
    inlineDynamicImports: true,
  },
  plugins: [
    nodeResolve({ module: true }),
    svelte({
      preprocess: autoPreprocess(),
      compilerOptions: {
        dev: false,
      },
      css: (css) => {
        css.write("dist/bundle.css")
      },
    }),
    postcss({ output: "bundle.css" }),
    commonjs(),
  ],
}

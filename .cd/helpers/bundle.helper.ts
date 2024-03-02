import { build } from "bun";
import dts from "bun-plugin-dts";

/**
 * Bundle a lib
 *
 * @param lib which lib to target
 *
 * @see https://bun.sh/docs/bundler
 */
export async function bundle(lib: string): Promise<void> {
  const result = await build({
    // Required. An array of paths corresponding to the entrypoints of our application.
    // One bundle will be generated for each entrypoint.
    entrypoints: [`./libs/${lib}/src/index.ts`],

    // The directory where output files will be written.
    outdir: `./build/${lib}`,

    // Default. For generating bundles that are intended for execution by a browser.
    // Prioritizes the "browser" export condition when resolving imports.
    // Importing any built-in modules, like node:events or node:path will work,
    // but calling some functions, like fs.readFile will not work.
    target: "browser",

    // Currently the bundler only supports one module format: "esm".
    // Support for "cjs" and "iife" are planned.
    format: "esm",

    // A separate *.js.map file is created alongside each *.js bundle.
    sourcemap: "external",

    // When targeting bun, identifiers will be minified by default.
    minify: true, // default false

    // Bun implements a universal plugin system for both Bun's runtime and bundler.
    // Refer to the plugin documentation for complete documentation.
    // https://bun.sh/docs/bundler/plugins
    plugins: [
      // Generates types (.d.ts)
      dts(),
    ],

    // A list of import paths to consider external.
    external: ["radash", "rxjs"],
  });

  if (result.success) {
    console.info(" ✔️🏗️ Build succeed");
  } else {
    console.error(" ❌ Build failed");
    result.logs.forEach((message) => console.error(`  -> ${message}`));
    throw new Error("Build failed");
  }
}

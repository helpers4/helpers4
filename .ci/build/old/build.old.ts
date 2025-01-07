import { emptyDir } from "fs-extra";
import { LIBS, bundle, copyDistFiles, customizePackageJson } from "../../helpers";

// Empty build folder
emptyDir("./build");
console.info(" ✔️🪥 Clean workspace");

// Build each lib, one by one
for (const lib of LIBS) {
  await buildLib(lib);
}

async function buildLib(lib: string) {
  console.log();
  console.group(`${lib.toUpperCase()} ${"-".repeat(60 - lib.length - 1)}`);

  // Build
  await bundle(lib);

  // Copy files
  copyDistFiles(lib);

  // Customize package.json
  await customizePackageJson(lib);

  console.groupEnd();
}

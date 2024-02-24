import * as fs from "fs";
import { readJson, writeJson } from "fs-extra";
import * as path from "path";
import rootPackage from "../../package.json";
import templatePackage from "../template/package.json";

const FILES_TO_COPY = [
  "CHANGELOG.md",
  "LICENSE.md",
  "package.json",
  "README.md",
];

/**
 * Copy files to the build.
 *
 * @param lib which lib to target
 */
export function copyDistFiles(lib: string): void {
  FILES_TO_COPY.forEach((file) => {
    const fileRoot = path.join(".", file);
    const fileSource = path.join(".", "libs", lib, file);
    const fileBuild = path.join(".", "build", lib, file);

    if (fs.existsSync(fileSource)) {
      fs.copyFileSync(fileSource, fileBuild);
      console.log(` ✔️📄 ${file} (from source)`);
    } else {
      if (fs.existsSync(fileRoot)) {
        fs.copyFileSync(fileRoot, fileBuild);
        console.log(` ✔️📄 ${file} (from root)`);
      } else {
        console.log(` ❌ ${file}`);
      }
    }
  });
}

/**
 * Update the local package.json with the global version number.
 *
 * @param lib which lib to target
 */
export async function customizePackageJson(lib: string): Promise<void> {
  const libPackagePath = `./build/${lib}/package.json`;

  const packageJson = await readJson(libPackagePath);

  // Update the version
  packageJson.version = rootPackage.version;

  // Add missing values
  Object.entries(templatePackage).forEach(([key, value]) => {
    if (!(key in packageJson)) {
      packageJson[key] =
        typeof value === "string" ? value.replaceAll("{{lib}}", lib) : value;
    }
  });

  writeJson(libPackagePath, packageJson, { spaces: 2 });

  console.log(" ✔️✍️ Package.json updated");
}

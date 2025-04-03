import { emptyDir, ensureDir, readdir } from "fs-extra";
import { join } from "path";
import { DIR } from "../_constants";
import {
  compileTypeScript,
  copyStaticCategoryFiles,
  createIndexFile,
  prepareCategoryPackageJson,
  prepareCategoryReadme
} from "./helpers";

async function main() {
  // Create or empty the /build directory
  await emptyDir(DIR.BUILD);
  console.info(" ✔️🪥 Clean workspace");

  // Read categories in the /helpers directory
  const categories = await readdir(DIR.HELPERS);

  for (const category of categories) {
    const categoryPath = join(DIR.HELPERS, category);
    const files = await readdir(categoryPath);

    // Filter .ts files, ignoring .test.ts, .bench.ts, etc.
    const tsFiles = files.filter(file => file.endsWith(".ts") && !file.match(/\.\w+\.ts$/));

    if (tsFiles.length > 0) {
      const buildCategoryDir = join(DIR.BUILD, category);
      const libDir = join(buildCategoryDir, "lib");

      // Create the category directory in /build
      await ensureDir(libDir);

      // Create an index.ts to export all methods
      const indexFilePath = await createIndexFile(categoryPath, tsFiles);

      // Compile the index.ts file
      await compileTypeScript(indexFilePath, libDir);

      // Copy static files
      await copyStaticCategoryFiles(buildCategoryDir);

      // Copy and prepare README.md
      await prepareCategoryReadme(buildCategoryDir, category, tsFiles, categories);

      // Copy and prepare package.json
      await prepareCategoryPackageJson(buildCategoryDir, category, tsFiles);

      console.info(` ✔️📦 Built ${category}`);
    }
  }
}

main().catch(error => {
  console.error("❌ Build failed:", error);
  process.exit(1);
});

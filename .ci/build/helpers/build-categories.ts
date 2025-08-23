import { ensureDir } from "fs-extra";
import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { DIR } from "../../_constants";
import {
  compileTypeScript,
  copyStaticCategoryFiles,
  createIndexFile,
  getExternalDependencies,
  prepareCategoryPackageJson,
  prepareCategoryReadme
} from "./";

/**
 * Build all individual category packages.
 * @returns Array of valid categories that were built
 */
export async function buildCategories(): Promise<string[]> {
  // Read categories in the /helpers directory
  const categories = await readdir(DIR.HELPERS);
  const validCategories: string[] = [];

  // Build individual categories
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

      // Get external dependencies for this category
      const externalDependencies = await getExternalDependencies(category);

      // Copy and prepare package.json
      await prepareCategoryPackageJson(buildCategoryDir, category, tsFiles, externalDependencies);

      validCategories.push(category);
      console.info(` ✔️📦 Built ${category}`);
    }
  }

  return validCategories;
}

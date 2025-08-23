import { ensureDir } from "fs-extra";
import { join } from "node:path";
import { DIR } from "../../_constants";
import {
  compileTypeScript,
  copyStaticBundleFiles,
  createBundleIndexFile,
  createBundleMetadata,
  prepareBundlePackageJson,
  prepareBundleReadme
} from "./";

/**
 * Build the bundle package that includes all categories.
 * @param validCategories - Array of category names to include in the bundle
 */
export async function buildBundle(validCategories: string[]): Promise<void> {
  if (validCategories.length === 0) {
    console.info(" ⚠️ No valid categories found, skipping bundle build");
    return;
  }

  const bundleName = "all"; // Internal name for the bundle
  const buildBundleDir = join(DIR.BUILD, bundleName);
  const libDir = join(buildBundleDir, "lib");

  // Create the bundle directory in /build
  await ensureDir(libDir);

  // Create bundle index file that re-exports all categories
  await createBundleIndexFile(buildBundleDir, validCategories);

  // Compile the bundle index.ts file
  await compileTypeScript(join(buildBundleDir, "index.ts"), libDir);

  // Copy static files
  await copyStaticBundleFiles(buildBundleDir);

  // Prepare bundle README.md
  await prepareBundleReadme(buildBundleDir, validCategories);

  // Prepare bundle package.json
  await prepareBundlePackageJson(buildBundleDir, validCategories);

  // Create metadata files
  await createBundleMetadata(buildBundleDir, validCategories);

  console.info(` ✔️🎁 Built bundle package (@helpers4/all) with ${validCategories.length} categories`);
}

import { emptyDir } from "fs-extra";
import { DIR } from "../_constants";
import { buildCategories } from "./build-categories";
import { buildBundle } from "./build-bundle";

async function main() {
  // Create or empty the /build directory
  await emptyDir(DIR.BUILD);
  console.info(" ✔️🪥 Clean workspace");

  // Build all individual categories
  const validCategories = await buildCategories();

  // Build the bundle package with all valid categories
  await buildBundle(validCategories);
}

main().catch(error => {
  console.error("❌ Build failed:", error);
  process.exit(1);
});

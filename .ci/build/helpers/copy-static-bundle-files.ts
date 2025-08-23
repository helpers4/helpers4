import { copy } from "fs-extra";
import { join } from "node:path";
import { DIR } from "../../_constants";

/**
 * Copy static files for the bundle (LICENSE.md).
 * @param buildBundleDir - The build bundle directory.
 */
export async function copyStaticBundleFiles(buildBundleDir: string) {
  // Copy LICENSE.md from template
  await copy(
    join(DIR.TEMPLATE_BUNDLE, "LICENSE.md"),
    join(buildBundleDir, "LICENSE.md")
  );
}

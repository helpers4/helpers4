/**
 * This file is part of helpers4.
 * Copyright (C) 2025 baxyz
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { join } from "node:path";
import { DIR } from "../../constants";

/**
 * Copy and prepare the package.json file for the bundle directory.
 * @param buildBundleDir - The build bundle directory.
 * @param categories - The list of available categories.
 */
export async function prepareBundlePackageJson(
  buildBundleDir: string,
  categories: string[]
) {
  // Use Bun's native JSON reading for both files
  const rootPackage = await Bun.file(join(DIR.ROOT, "package.json")).json();
  const templatePackage = await Bun.file(join(DIR.TEMPLATE_BUNDLE, "package.json")).json();

  const version = rootPackage.version;

  // Create dependencies object with all categories
  const dependencies = categories.reduce<Record<string, string>>((acc, category) => {
    acc[`@helpers4/${category}`] = version;
    return acc;
  }, {});

  // Clone the template and update the values
  const packageJson = {
    ...templatePackage,
    version,
    dependencies
  };

  // Use Bun's native JSON writing
  await Bun.write(join(buildBundleDir, "package.json"), JSON.stringify(packageJson, null, 2));
}

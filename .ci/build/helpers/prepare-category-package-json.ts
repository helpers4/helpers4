/**
 * This file is part of helpers4.
 * Copyright (C) 2025 baxyz
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { join } from "node:path";
import { DIR } from "../../_constants";

/**
 * Copy and prepare the package.json file for the build category directory.
 * @param buildCategoryDir - The build category directory.
 * @param category - The current category.
 * @param tsFiles - The list of TypeScript files.
 * @param externalDependencies - The list of external package dependencies.
 */
export async function prepareCategoryPackageJson(
  buildCategoryDir: string,
  category: string,
  tsFiles: string[],
  externalDependencies: string[] = []
) {
  // Use Bun's native JSON reading for both files
  const rootPackage = await Bun.file(join(DIR.ROOT, "package.json")).json();
  const templatePackage = await Bun.file(join(DIR.TEMPLATE_CATEGORY, "package.json")).json();

  const version = rootPackage.version;
  const methods = tsFiles.map(file => file.replace(".ts", ""));

  // Clone the template and update the values
  const packageJson = {
    ...templatePackage,
    version,
    name: templatePackage.name?.replace(/{{category}}/g, category),
    description: templatePackage.description?.replace(/{{category}}/g, category),
    keywords: templatePackage.keywords?.flatMap((keyword: string) =>
      keyword === "{{category}}" ? category :
        keyword === "{{methods}}" ? methods :
          keyword
    )
  };

  // Filter dependencies that exist in root package.json
  const peerDependencies = externalDependencies
    // Map to [dep, version] pairs
    // The version comes from root package.json
    .map(dep => [dep, rootPackage.dependencies?.[dep] || rootPackage.devDependencies?.[dep]])
    // Filter out any dependencies that don't exist in the root package.json
    .filter(([, version]) => !!version)
    // Reduce to an object { dep: version }
    .reduce<Record<string, string>>((acc, [dep, version]) => {
      acc[dep] = version;
      return acc;
    }, {});

  // Add peerDependencies only if there are any keys
  if (Object.keys(peerDependencies).length > 0) {
    packageJson.peerDependencies = peerDependencies;
  }

  // Use Bun's native JSON writing
  await Bun.write(join(buildCategoryDir, "package.json"), JSON.stringify(packageJson, null, 2));
}

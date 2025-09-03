/**
 * helpers4 - A collection of TypeScript/JavaScript utilities
 * Copyright (C) 2025 baxyz
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

/**
 * This file is part of helpers4.
 * Copyright (C) 2025 baxyz
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { join } from "node:path";
import { DIR } from "../../_constants";
import { stripV } from "../../../helpers/version/stripV";

/**
 * Create metadata files for the bundle.
 * @param buildBundleDir - The build bundle directory.
 * @param categories - The list of available categories.
 */
export async function createBundleMetadata(
  buildBundleDir: string,
  categories: string[]
) {
  const metaDir = join(buildBundleDir, "meta");

  // Read root package.json to get version and other info
  const rootPackage = await Bun.file(join(DIR.ROOT, "package.json")).json();

  // Get Bun version
  let bunVersion: string | null = null;
  try {
    // Try different ways to get Bun version
    bunVersion = Bun.version || (process.versions as any).bun || null;
  } catch (error) {
    // Fallback if Bun.version is not available
    bunVersion = null;
  }

  // Create build.json with build metadata
  const buildMetadata = {
    buildDate: new Date().toISOString(),
    version: stripV(rootPackage.version),
    categories: categories.sort(),
    totalCategories: categories.length,
    buildTool: "bun",
    bunVersion: bunVersion ? stripV(bunVersion) : null,
    nodeVersion: stripV(process.version),
    platform: process.platform
  };

  await Bun.write(
    join(metaDir, "build.json"),
    JSON.stringify(buildMetadata, null, 2)
  );

  // Create packages.json with all package versions
  const packagesMetadata = categories.reduce<Record<string, string>>((acc, category) => {
    acc[`@helpers4/${category}`] = rootPackage.version;
    return acc;
  }, {
    // Include the bundle package itself
    "@helpers4/all": rootPackage.version
  });

  await Bun.write(
    join(metaDir, "packages.json"),
    JSON.stringify(packagesMetadata, null, 2)
  );
}

import { join } from "node:path";
import { DIR } from "../../_constants";

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
  const stripV = (version: string | null | undefined) =>
    typeof version === "string" && version.startsWith("v") ? version.slice(1) : version;

  const buildMetadata = {
    buildDate: new Date().toISOString(),
    version: stripV(rootPackage.version),
    categories: categories.sort(),
    totalCategories: categories.length,
    radashiVersion: stripV(rootPackage.dependencies?.radashi || rootPackage.devDependencies?.radashi || null),
    buildTool: "bun",
    bunVersion: stripV(bunVersion),
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

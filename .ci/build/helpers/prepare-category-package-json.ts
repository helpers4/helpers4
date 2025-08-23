import { readFile, writeFile } from "fs-extra";
import { join } from "path";
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
    const rootPackageJson = await readFile(join(DIR.ROOT, "package.json"), "utf-8");
    const rootPackageJsonContent = JSON.parse(rootPackageJson);
    const version = rootPackageJsonContent.version;

    const packageJsonTemplate = await readFile(join(DIR.TEMPLATE_CATEGORY, "package.json"), "utf-8");
    const methodsList = tsFiles.map(file => file.replace(".ts", "")).join('", "');

    let packageJsonContent = packageJsonTemplate
        .replace(/{{category}}/g, category)
        .replace(/{{methods}}/g, methodsList)
        .replace(/{{version}}/g, version);

    // Add peerDependencies if there are external dependencies
    if (externalDependencies.length > 0) {
        const packageJson = JSON.parse(packageJsonContent);

        // Create peerDependencies object with versions from root package.json
        const peerDependencies: Record<string, string> = {};

        for (const dep of externalDependencies) {
            // Check in dependencies first, then devDependencies
            const dependencyVersion = rootPackageJsonContent.dependencies?.[dep] ||
                rootPackageJsonContent.devDependencies?.[dep];

            if (dependencyVersion) {
                peerDependencies[dep] = dependencyVersion;
            }
        }

        // Only add peerDependencies if we found at least one version
        if (Object.keys(peerDependencies).length > 0) {
            packageJson.peerDependencies = peerDependencies;
        }

        packageJsonContent = JSON.stringify(packageJson, null, 2);
    }

    await writeFile(join(buildCategoryDir, "package.json"), packageJsonContent);
}

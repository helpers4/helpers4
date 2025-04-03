import { readFile, writeFile } from "fs-extra";
import { join } from "path";
import { DIR } from "../../_constants";

/**
 * Copy and prepare the package.json file for the build category directory.
 * @param buildCategoryDir - The build category directory.
 * @param category - The current category.
 * @param tsFiles - The list of TypeScript files.
 */
export async function prepareCategoryPackageJson(buildCategoryDir: string, category: string, tsFiles: string[]) {
    const rootPackageJson = await readFile(join(DIR.ROOT, "package.json"), "utf-8");
    const rootPackageJsonContent = JSON.parse(rootPackageJson);
    const version = rootPackageJsonContent.version;

    const packageJsonTemplate = await readFile(join(DIR.TEMPLATE_CATEGORY, "package.json"), "utf-8");
    const methodsList = tsFiles.map(file => file.replace(".ts", "")).join('", "');

    const packageJsonContent = packageJsonTemplate
        .replace(/{{category}}/g, category)
        .replace(/{{methods}}/g, methodsList)
        .replace(/{{version}}/g, version);

    await writeFile(join(buildCategoryDir, "package.json"), packageJsonContent);
}

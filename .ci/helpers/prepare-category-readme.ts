import { readFile, writeFile } from "fs-extra";
import { join } from "path";
import { DIR } from "../constants";

/**
 * Copy and prepare the README.md file for the build category directory.
 * @param buildCategoryDir - The build category directory.
 * @param category - The current category.
 * @param tsFiles - The list of TypeScript files.
 * @param categories - The list of all categories.
 */
export async function prepareCategoryReadme(buildCategoryDir: string, category: string, tsFiles: string[], categories: string[]) {
    const readmeTemplate = await readFile(join(DIR.TEMPLATE_CATEGORY, "README.md"), "utf-8");
    const methodsList = tsFiles.map(file => `- ${file.replace(".ts", "")}`).join("\n");
    const siblingsList = categories.filter(cat => cat !== category).map(cat => `- [${cat}](../${cat})`).join("\n");

    const readmeContent = readmeTemplate
        .replace(/{{category}}/g, category)
        .replace(/<!-- AUTOMATIC-METHODS -->[\s\S]*<!-- \/AUTOMATIC-METHODS -->/, `<!-- AUTOMATIC-METHODS -->\n${methodsList}\n<!-- /AUTOMATIC-METHODS -->`)
        .replace(/<!-- AUTOMATIC-SIBLINGS -->[\s\S]*<!-- \/AUTOMATIC-SIBLINGS -->/, `<!-- AUTOMATIC-SIBLINGS -->\n${siblingsList}\n<!-- /AUTOMATIC-SIBLINGS -->`);

    await writeFile(join(buildCategoryDir, "README.md"), readmeContent);
}

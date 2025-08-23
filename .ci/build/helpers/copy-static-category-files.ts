import { copyFile } from "node:fs/promises";
import { join } from "node:path";
import { DIR, TEMPLATE_CATEGORY_STATIC_FILES } from "../../_constants";

/**
 * Copy static files from the template directory to the build category directory.
 * @param buildCategoryDir - The build category directory.
 */
export async function copyStaticCategoryFiles(buildCategoryDir: string) {
    for (const file of TEMPLATE_CATEGORY_STATIC_FILES) {
        await copyFile(join(DIR.TEMPLATE_CATEGORY, file), join(buildCategoryDir, file));
    }
}

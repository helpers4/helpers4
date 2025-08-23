import { join, basename } from "node:path";

/**
 * Create an index.ts file that exports all matched .ts files in the category.
 * 
 * Note: the .gitignore rules should ignore this index.ts file, so it doesn't
 * get committed.
 * 
 * @param categoryPath - The path of the category.
 * @param tsFiles - The list of TypeScript files.
 * @returns The path of the created index.ts file.
 */
export async function createIndexFile(categoryPath: string, tsFiles: string[]) {
    const indexContent = tsFiles
        .map(file => `export * from './${basename(file, ".ts")}';`)
        .join("\n")
        + "\n";
    const indexPath = join(categoryPath, "index.ts");
    await Bun.write(indexPath, indexContent);
    return indexPath;
}

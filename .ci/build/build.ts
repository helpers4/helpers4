import { emptyDir, ensureDir, readdir, readFile, writeFile } from "fs-extra";
import { join, basename, dirname } from "path";
import { exec } from "child_process";

const ROOT_DIR = "./";
const BUILD_DIR = join(ROOT_DIR, "build");
const HELPERS_DIR = join(ROOT_DIR, "helpers");

async function main() {
  // Créer ou vider le dossier /build
  await emptyDir(BUILD_DIR);
  console.info(" ✔️🪥 Clean workspace");

  // Lire les catégories dans le dossier /helpers
  const categories = await readdir(HELPERS_DIR);

  for (const category of categories) {
    const categoryPath = join(HELPERS_DIR, category);
    const files = await readdir(categoryPath);

    // Filtrer les fichiers .ts, en ignorant les fichiers .test.ts, .bench.ts, etc.
    const tsFiles = files.filter(file => file.endsWith(".ts") && !file.includes(".test.") && !file.includes(".bench.") && !file.includes(".something."));

    if (tsFiles.length > 0) {
      const buildCategoryDir = join(BUILD_DIR, category);
      const libDir = join(buildCategoryDir, "lib");

      // Créer le dossier de la catégorie dans /build
      await ensureDir(libDir);

      // Compiler chaque fichier .ts
      for (const file of tsFiles) {
        const filePath = join(categoryPath, file);
        await compileTypeScript(filePath, libDir);
      }

      // Créer un index.ts pour exporter toutes les méthodes
      await createIndexFile(libDir, tsFiles);

      console.info(` ✔️📦 Built ${category}`);
    }
  }
}

async function compileTypeScript(filePath: string, outDir: string) {
  return new Promise<void>((resolve, reject) => {
    exec(`bun build ${filePath} --outdir ${outDir}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Error compiling ${filePath}:`, stderr);
        reject(error);
      } else {
        console.log(stdout);
        resolve();
      }
    });
  });
}

async function createIndexFile(libDir: string, tsFiles: string[]) {
  const exports = tsFiles.map(file => {
    const fileName = basename(file, ".ts");
    return `export * from './${fileName}';`;
  }).join("\n");

  const indexPath = join(libDir, "index.ts");
  await writeFile(indexPath, exports);
}

main().catch(error => {
  console.error("❌ Build failed:", error);
  process.exit(1);
});

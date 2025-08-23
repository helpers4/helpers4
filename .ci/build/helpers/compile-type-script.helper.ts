/**
 * This file is part of helpers4.
 * Copyright (C) 2025 baxyz
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { exec } from "node:child_process";

/**
 * Compile a TypeScript file using the bun build command.
 * 
 * @param filePath - The path of the TypeScript file to compile.
 * @param outDir - The output directory for the compiled file.
 * @returns A promise that resolves when the compilation is complete.
 */
export async function compileTypeScript(filePath: string, outDir: string) {
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

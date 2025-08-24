/**
 * This file is part of helpers4.
 * Copyright (C) 2025 baxyz
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { basename } from "node:path";

/**
 * Compile a TypeScript file using the bun build command and generate .d.ts files.
 * 
 * @param filePath - The path of the TypeScript file to compile.
 * @param outDir - The output directory for the compiled file.
 * @returns A promise that resolves when the compilation is complete.
 */
export async function compileTypeScript(filePath: string, outDir: string) {
  try {
    // Build JS files with external dependencies
    await Bun.build({
      entrypoints: [filePath],
      outdir: outDir,
      external: ['*']
    });

    // Generate .d.ts file by reading the source TypeScript and creating a simplified declaration
    await generateSimpleDts(filePath, outDir);

  } catch (error) {
    console.error(`❌ Error compiling ${filePath}:`, error);
    throw error;
  }
}

/**
 * Generate a simple .d.ts file by analyzing the TypeScript source
 */
async function generateSimpleDts(filePath: string, outDir: string) {
  const fileName = basename(filePath, '.ts');
  const dtsPath = `${outDir}/${fileName}.d.ts`;

  // Read the TypeScript file
  const sourceFile = Bun.file(filePath);
  const sourceContent = await sourceFile.text();

  // Extract exports and create declarations
  const dtsContent = generateDeclarationsFromSource(sourceContent, filePath);

  // Write the .d.ts file
  await Bun.write(dtsPath, dtsContent);
}

/**
 * Generate TypeScript declarations from source code
 */
function generateDeclarationsFromSource(source: string, filePath: string): string {
  const lines = source.split('\n');
  const declarations: string[] = [];

  // Add imports (keep type imports, convert regular imports for .d.ts compatibility)
  for (const line of lines) {
    const trimmed = line.trim();

    // Keep type imports as-is
    if (trimmed.startsWith('import type') || trimmed.includes('import { type')) {
      declarations.push(line);
    }
    // Convert regular imports to type imports for .d.ts files
    else if (trimmed.startsWith('import') && !trimmed.includes('from \'node:') && !trimmed.includes('from "node:')) {
      declarations.push(line);
    }
  }

  // Add export declarations
  for (const line of lines) {
    const trimmed = line.trim();

    // Handle export function declarations
    if (trimmed.startsWith('export function') || trimmed.startsWith('export async function')) {
      const functionSignature = extractFunctionSignature(trimmed);
      if (functionSignature) {
        declarations.push(`export declare ${functionSignature};`);
      }
    }
    // Handle export const declarations
    else if (trimmed.startsWith('export const')) {
      const constDeclaration = extractConstDeclaration(trimmed);
      if (constDeclaration) {
        declarations.push(`export declare ${constDeclaration};`);
      }
    }
    // Handle re-exports
    else if (trimmed.startsWith('export *') || trimmed.startsWith('export {')) {
      declarations.push(line);
    }
  }

  return declarations.join('\n') + '\n';
}

/**
 * Extract function signature for declaration
 */
function extractFunctionSignature(line: string): string | null {
  // Match: export [async] function name(...): type
  const match = line.match(/export\s+(async\s+)?function\s+([^(]+\([^)]*\))\s*:\s*([^{;]+)/);
  if (match) {
    const asyncKeyword = match[1] || '';
    const signature = match[2];
    const returnType = match[3].trim();
    return `${asyncKeyword}function ${signature}: ${returnType}`;
  }

  // Fallback: try to extract just the signature part before any {
  const simpleMatch = line.match(/export\s+(async\s+)?function\s+([^{]+)/);
  if (simpleMatch) {
    const asyncKeyword = simpleMatch[1] || '';
    const signature = simpleMatch[2].trim().replace(/\s+{.*$/, '');
    return `${asyncKeyword}function ${signature}`;
  }

  return null;
}

/**
 * Extract const declaration for declaration
 */
function extractConstDeclaration(line: string): string | null {
  // Match: export const name: type = ...
  const match = line.match(/export\s+const\s+([^=:]+)(\s*:\s*[^=]+)?/);
  if (match) {
    const name = match[1].trim();
    const type = match[2] || ': any';
    return `const ${name}${type}`;
  }
  return null;
}

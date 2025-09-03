/**
 * This file is part of helpers4.
 * Copyright (C) 2025 baxyz
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { basename, dirname, join } from "node:path";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";

/**
 * Compile a TypeScript file using Bun build with custom .d.ts generation.
 * 
 * @param filePath - The path of the TypeScript file to compile.
 * @param outDir - The output directory for the compiled file.
 * @returns A promise that resolves when the compilation is complete.
 */
export async function compileTypeScript(filePath: string, outDir: string) {
  try {
    // Build JS files with bundling using Bun
    await Bun.build({
      entrypoints: [filePath],
      outdir: outDir,
      external: ['radashi', 'simple-deepcompare', 'angular-oauth2-oidc'],
      format: 'esm',
      splitting: false,
    });

    // Generate .d.ts files using our custom implementation
    await generateDeclarationsFromSources(filePath, outDir);

  } catch (error) {
    console.error(`❌ Error compiling ${filePath}:`, error);
  }
}

/**
 * Generate .d.ts by parsing and extracting types from the original TypeScript sources
 */
async function generateDeclarationsFromSources(indexPath: string, outDir: string) {
  const fileName = basename(indexPath, '.ts');
  const dtsPath = `${outDir}/${fileName}.d.ts`;
  const sourceDir = dirname(indexPath);

  // Read the index file to understand what files are included
  const indexFile = Bun.file(indexPath);
  const indexContent = await indexFile.text();

  const declarations: string[] = [];
  const externalImports = new Set<string>();
  const processedFiles = new Set<string>();

  // Extract imports from the index file
  const importLines = indexContent.split('\n').filter(line => {
    const trimmed = line.trim();
    return trimmed.startsWith('import') && !trimmed.startsWith('//');
  });

  for (const importLine of importLines) {
    // Handle external imports
    if (!importLine.includes("from './") && !importLine.includes('from "./')) {
      externalImports.add(importLine);
      continue;
    }

    // Handle local imports and re-exports
    const importMatch = importLine.match(/from\s+['"](\.[^'"]+)['"]/);
    if (importMatch) {
      const importPath = importMatch[1];
      const fullPath = `${sourceDir}/${importPath}.ts`;

      if (!processedFiles.has(fullPath)) {
        processedFiles.add(fullPath);
        await extractDeclarationsFromFile(fullPath, declarations);
      }
    }
  }

  // Handle re-export lines (export * from './module')
  const reExportLines = indexContent.split('\n').filter(line => {
    const trimmed = line.trim();
    return trimmed.startsWith('export *') && (trimmed.includes("from './") || trimmed.includes('from "./'));
  });

  for (const reExportLine of reExportLines) {
    const importMatch = reExportLine.match(/from\s+['"](\.[^'"]+)['"]/);
    if (importMatch) {
      const importPath = importMatch[1];
      const fullPath = `${sourceDir}/${importPath}.ts`;

      if (!processedFiles.has(fullPath)) {
        processedFiles.add(fullPath);
        await extractDeclarationsFromFile(fullPath, declarations);
      }
    }
  }

  // Combine external imports and declarations
  const finalContent = [
    ...Array.from(externalImports),
    '',
    ...declarations
  ].filter(line => line !== '').join('\n') + '\n';

  await Bun.write(dtsPath, finalContent);
}

/**
 * Extract TypeScript declarations from a single file
 */
async function extractDeclarationsFromFile(filePath: string, declarations: string[]) {
  try {
    const file = Bun.file(filePath);
    if (!(await file.exists())) return;

    const content = await file.text();
    const lines = content.split('\n');

    let inMultiLineComment = false;

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      const originalLine = line;
      const trimmed = line.trim();

      // Skip comments
      if (trimmed.startsWith('/**') && !trimmed.endsWith('*/')) {
        inMultiLineComment = true;
        continue;
      }
      if (inMultiLineComment) {
        if (trimmed.endsWith('*/')) {
          inMultiLineComment = false;
        }
        continue;
      }
      if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed === '') {
        continue;
      }

      // Handle type exports
      if (trimmed.startsWith('export type') || trimmed.startsWith('export interface')) {
        const typeDeclaration = collectCompleteDeclaration(lines, i);
        declarations.push(typeDeclaration.content);
        i = typeDeclaration.endIndex;
        continue;
      }

      // Handle function exports (including multi-line)
      if (trimmed.startsWith('export function') || trimmed.startsWith('export async function')) {
        const functionDecl = collectFunctionSignature(lines, i);
        const signature = extractFunctionSignature(functionDecl.content);
        if (signature) {
          declarations.push(`export declare ${signature};`);
        }
        i = functionDecl.endIndex;
        continue;
      }

      // Handle const exports
      if (trimmed.startsWith('export const')) {
        const constDeclaration = extractConstDeclaration(line, lines, i);
        if (constDeclaration) {
          declarations.push(`export declare ${constDeclaration};`);
        }
        continue;
      }
    }
  } catch (error) {
    console.warn(`Could not process file ${filePath}:`, error);
  }
}

/**
 * Collect complete multi-line declarations (types, interfaces)
 */
function collectCompleteDeclaration(lines: string[], startIndex: number): { content: string; endIndex: number } {
  let content = lines[startIndex];
  let braceCount = 0;
  let inString = false;
  let stringChar = '';

  // Count braces in the first line
  for (const char of content) {
    if (!inString && (char === '"' || char === "'" || char === '`')) {
      inString = true;
      stringChar = char;
    } else if (inString && char === stringChar) {
      inString = false;
    } else if (!inString) {
      if (char === '{') braceCount++;
      if (char === '}') braceCount--;
    }
  }

  let i = startIndex;
  while (i < lines.length - 1 && braceCount > 0) {
    i++;
    const line = lines[i];
    content += '\n' + line;

    // Count braces
    for (const char of line) {
      if (!inString && (char === '"' || char === "'" || char === '`')) {
        inString = true;
        stringChar = char;
      } else if (inString && char === stringChar) {
        inString = false;
      } else if (!inString) {
        if (char === '{') braceCount++;
        if (char === '}') braceCount--;
      }
    }
  }

  return { content: content.trim(), endIndex: i };
}

/**
 * Collect complete function signature including multi-line parameters
 */
function collectFunctionSignature(lines: string[], startIndex: number): { content: string; endIndex: number } {
  let content = lines[startIndex];
  let parenCount = 0;
  let inString = false;
  let stringChar = '';

  // Count parentheses in the first line
  for (const char of content) {
    if (!inString && (char === '"' || char === "'" || char === '`')) {
      inString = true;
      stringChar = char;
    } else if (inString && char === stringChar) {
      inString = false;
    } else if (!inString) {
      if (char === '(') parenCount++;
      if (char === ')') parenCount--;
    }
  }

  // If we find the opening brace, stop there (function signature complete)
  if (content.includes('{') && parenCount <= 0) {
    const beforeBrace = content.substring(0, content.indexOf('{')).trim();
    return { content: beforeBrace, endIndex: startIndex };
  }

  let i = startIndex;
  while (i < lines.length - 1 && (parenCount > 0 || !content.includes('{'))) {
    i++;
    const line = lines[i];
    content += ' ' + line.trim();

    // Count parentheses
    for (const char of line) {
      if (!inString && (char === '"' || char === "'" || char === '`')) {
        inString = true;
        stringChar = char;
      } else if (inString && char === stringChar) {
        inString = false;
      } else if (!inString) {
        if (char === '(') parenCount++;
        if (char === ')') parenCount--;
      }
    }

    // Stop at opening brace
    if (content.includes('{')) {
      const beforeBrace = content.substring(0, content.indexOf('{')).trim();
      return { content: beforeBrace, endIndex: i };
    }
  }

  return { content: content.trim(), endIndex: i };
}

/**
 * Extract function signature
 */
function extractFunctionSignature(line: string): string | null {
  // Handle single-line function signatures
  const match = line.match(/export\s+(async\s+)?function\s+([^{(]+)\s*\(([^)]*)\)\s*:\s*([^{]+)/);
  if (match) {
    const asyncKeyword = match[1] || '';
    const funcName = match[2].trim();
    const params = match[3].trim();
    const returnType = match[4].trim();
    return `${asyncKeyword}function ${funcName}(${params}): ${returnType}`;
  }

  // Fallback for functions without explicit return type
  const simpleMatch = line.match(/export\s+(async\s+)?function\s+([^{(]+)\s*\(([^)]*)\)/);
  if (simpleMatch) {
    const asyncKeyword = simpleMatch[1] || '';
    const funcName = simpleMatch[2].trim();
    const params = simpleMatch[3].trim();
    return `${asyncKeyword}function ${funcName}(${params})`;
  }

  return null;
}

/**
 * Extract const declaration with type
 */
function extractConstDeclaration(line: string, lines: string[], index: number): string | null {
  // Look for typed const declarations
  const typedMatch = line.match(/export\s+const\s+([^:=]+):\s*([^=]+)=/);
  if (typedMatch) {
    const name = typedMatch[1].trim();
    const type = typedMatch[2].trim();
    return `const ${name}: ${type}`;
  }

  // Look for const with inferred type from assignment
  const simpleMatch = line.match(/export\s+const\s+([^=]+)=/);
  if (simpleMatch) {
    const name = simpleMatch[1].trim();
    const restOfLine = line.substring(line.indexOf('=') + 1).trim();

    // Try to infer type from the assignment
    let inferredType = 'any';
    if (restOfLine.includes('=>') || restOfLine.includes('function')) {
      inferredType = '(...args: any[]) => any';
    } else if (restOfLine.match(/^\d+$/)) {
      inferredType = 'number';
    } else if (restOfLine.match(/^["'`]/)) {
      inferredType = 'string';
    } else if (restOfLine.match(/^(true|false)$/)) {
      inferredType = 'boolean';
    }

    return `const ${name}: ${inferredType}`;
  }

  return null;
}



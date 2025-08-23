#!/usr/bin/env bun

/**
 * This file is part of helpers4.
 * Copyright (C) 2025 baxyz
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/**
 * Script to automatically add AGPL-3.0-or-later license headers
 * to TypeScript files in the helpers4 project.
 * 
 * Improvements:
 * - Uses native Bun.Glob (no external dependencies)
 * - Portable via PROJECT_ROOT environment variable
 * - Works in local, devcontainer, CI/CD environments
 * - Handles shebangs correctly
 * - Intelligently avoids duplicates
 */

import { readFile, writeFile } from "fs/promises";
import { resolve } from "path";

const LICENSE_HEADER = `/**
 * This file is part of helpers4.
 * Copyright (C) 2025 baxyz
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

`;

async function addLicenseHeader() {
  // Use current directory or environment variable
  const projectRoot = process.env.PROJECT_ROOT || process.cwd();
  console.log(`🔍 Processing files in: ${projectRoot}`);

  // Search for all TypeScript files in the project with Bun.Glob
  const patterns = [
    "helpers/**/*.ts",
    ".ci/**/*.ts",
    "*.ts"  // root files like add-license-headers.ts
  ];

  let totalProcessed = 0;
  let totalSkipped = 0;
  let totalAdded = 0;

  for (const pattern of patterns) {
    // Use Bun.glob() instead of external package
    const glob = new Bun.Glob(pattern);
    const files = [...glob.scanSync({ cwd: projectRoot, onlyFiles: true })];

    for (const file of files) {
      totalProcessed++;

      // Exclude generated build files and others
      if (file.includes('node_modules') ||
        file.includes('build/') ||
        file.endsWith('.d.ts')) {
        totalSkipped++;
        continue;
      }

      const fullPath = resolve(projectRoot, file);

      try {
        const content = await readFile(fullPath, "utf-8");

        // Check if header already exists
        if (content.includes("This file is part of helpers4")) {
          console.log(`⏭️  Skipping ${file} - header already exists`);
          totalSkipped++;
          continue;
        }

        // Special handling for files starting with #!/usr/bin/env
        const lines = content.split('\n');
        let newContent = '';

        if (lines[0] && lines[0].startsWith('#!/')) {
          // Keep the shebang line
          newContent = lines[0] + '\n\n' + LICENSE_HEADER + lines.slice(1).join('\n');
        } else {
          newContent = LICENSE_HEADER + content;
        }

        await writeFile(fullPath, newContent);

        console.log(`✅ Added header to ${file}`);
        totalAdded++;
      } catch (error) {
        console.error(`❌ Error processing ${file}:`, error);
      }
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Files processed: ${totalProcessed}`);
  console.log(`   Headers added: ${totalAdded}`);
  console.log(`   Files skipped: ${totalSkipped}`);
}

addLicenseHeader().catch(console.error);

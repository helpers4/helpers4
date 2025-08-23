#!/usr/bin/env node

/**
 * Test script to verify the bundle package works correctly
 */

import { join } from "node:path";
import { readdir } from "node:fs/promises";

async function testBundle() {
  console.log("🧪 Testing @helpers4/all bundle package...");

  const bundlePath = join(process.cwd(), "build/all");

  // Check if all expected files exist
  const expectedFiles = [
    "package.json",
    "README.md",
    "LICENSE.md",
    "meta/build.json",
    "meta/packages.json"
  ];

  for (const file of expectedFiles) {
    const filePath = join(bundlePath, file);
    try {
      await Bun.file(filePath).text();
      console.log(`✅ ${file} exists`);
    } catch (error) {
      console.log(`❌ ${file} missing`);
      return false;
    }
  }

  // Test metadata content
  const buildMeta = await Bun.file(join(bundlePath, "meta/build.json")).json();
  const packagesMeta = await Bun.file(join(bundlePath, "meta/packages.json")).json();
  const packageJson = await Bun.file(join(bundlePath, "package.json")).json();

  console.log(`✅ Bundle contains ${buildMeta.totalCategories} categories`);
  console.log(`✅ Build date: ${new Date(buildMeta.buildDate).toLocaleString()}`);
  console.log(`✅ Version: ${buildMeta.version}`);
  console.log(`✅ Dependencies: ${Object.keys(packageJson.dependencies || {}).length} packages`);
  console.log(`✅ Metadata includes ${Object.keys(packagesMeta).length} package versions`);

  console.log("\n🎉 Bundle package test completed successfully!");
  return true;
}

// Run the test if this script is called directly
if (import.meta.url.endsWith(process.argv[1])) {
  testBundle().catch(console.error);
}

export { testBundle };

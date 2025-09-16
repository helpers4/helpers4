#!/usr/bin/env node

/**
 * This file is part of helpers4.
 * Copyright (C) 2025 baxyz
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/**
 * Bundle Package coherency test
 */

import { join } from "node:path";

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

async function runBundleTest() {
  try {
    console.log("🧪 Bundle Package:");
    console.log("   Tests the main bundle package integrity");
    
    const result = await testBundle();
    
    if (result === false) {
      throw new Error("Test Bundle Package returned false");
    }
    
    console.log("✅ Bundle Package passed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Bundle Package failed:", error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

// Run the test if this script is called directly
if (import.meta.url.includes(process.argv[1]) || import.meta.url.includes('bundle')) {
  runBundleTest().catch(console.error);
}
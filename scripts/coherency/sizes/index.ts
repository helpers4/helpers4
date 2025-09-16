#!/usr/bin/env node

/**
 * This file is part of helpers4.
 * Copyright (C) 2025 baxyz
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/**
 * Bundle Sizes coherency test
 */

import { testBundleSizes } from "./helper";

async function runBundleSizesTest() {
  try {
    console.log("🧪 Bundle Sizes:");
    console.log("   Analyzes and reports package sizes");

    await testBundleSizes();

    console.log("✅ Bundle Sizes passed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Bundle Sizes failed:", error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

// Run the test if this script is called directly  
if (import.meta.url.includes(process.argv[1]) || import.meta.url.includes('sizes')) {
  runBundleSizesTest().catch(console.error);
}
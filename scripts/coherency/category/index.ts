#!/usr/bin/env node

/**
 * This file is part of helpers4.
 * Copyright (C) 2025 baxyz
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/**
 * Category Packages coherency test
 */

import { testCategoryPackages } from "./helper";

async function runCategoryPackagesTest() {
  try {
    console.log("🧪 Category Packages:");
    console.log("   Validates category packages structure and content");

    await testCategoryPackages();

    console.log("✅ Category Packages passed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Category Packages failed:", error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

// Run the test if this script is called directly
if (import.meta.url.includes(process.argv[1]) || import.meta.url.includes('category')) {
  runCategoryPackagesTest().catch(console.error);
}
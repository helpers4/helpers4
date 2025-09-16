#!/usr/bin/env node

/**
 * This file is part of helpers4.
 * Copyright (C) 2025 baxyz
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/**
 * Version Consistency coherency test
 */

import { testVersionConsistency } from "./helper";

async function runVersionConsistencyTest() {
  try {
    console.log("🧪 Version Consistency:");
    console.log("   Ensures all packages have consistent versions");

    await testVersionConsistency();

    console.log("✅ Version Consistency passed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Version Consistency failed:", error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

// Run the test if this script is called directly
if (import.meta.url.includes(process.argv[1]) || import.meta.url.includes('version')) {
  runVersionConsistencyTest().catch(console.error);
}
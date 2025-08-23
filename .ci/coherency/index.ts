#!/usr/bin/env node

/**
 * This file is part of helpers4.
 * Copyright (C) 2025 baxyz
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */


/**
 * Coherency tests runner - validates the integrity of the build system
 */

import { testBundle } from "./test-bundle";

async function runCoherencyTests() {
  console.log("🔍 Running coherency tests...\n");

  let allPassed = true;

  // Run bundle tests
  try {
    console.log("📦 Testing bundle package:");
    await testBundle();
  } catch (error) {
    console.error("❌ Bundle test failed:", error);
    allPassed = false;
  }

  // Future coherency tests can be added here
  // - Test category packages integrity
  // - Test version consistency
  // - Test dependencies coherency
  // - etc.

  console.log("\n" + "=".repeat(50));
  if (allPassed) {
    console.log("✅ All coherency tests passed!");
    process.exit(0);
  } else {
    console.log("❌ Some coherency tests failed!");
    process.exit(1);
  }
}

// Run tests if this script is called directly
if (import.meta.url.endsWith(process.argv[1])) {
  runCoherencyTests().catch(console.error);
}

export { runCoherencyTests };

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
import { testVersionConsistency } from "./test-version-consistency";
import { testCategoryPackages } from "./test-category-packages";
import { testDependenciesCoherency } from "./test-dependencies-coherency";
import { testBundleSizes } from "./test-bundle-sizes";

interface CoherencyTest {
  name: string;
  description: string;
  testFunction: () => Promise<void | boolean>;
}

const coherencyTests: CoherencyTest[] = [
  {
    name: "Bundle Package",
    description: "Tests the main bundle package integrity",
    testFunction: testBundle
  },
  {
    name: "Version Consistency",
    description: "Ensures all packages have consistent versions",
    testFunction: testVersionConsistency
  },
  {
    name: "Category Packages",
    description: "Validates category packages structure and content",
    testFunction: testCategoryPackages
  },
  {
    name: "Dependencies Coherency",
    description: "Checks dependencies consistency across packages",
    testFunction: testDependenciesCoherency
  },
  {
    name: "Bundle Sizes",
    description: "Analyzes and reports package sizes",
    testFunction: testBundleSizes
  }
];

async function runCoherencyTests() {
  console.log("🔍 Running coherency tests...\n");

  let allPassed = true;
  const results: { name: string; passed: boolean; error?: Error }[] = [];

  for (const test of coherencyTests) {
    try {
      console.log(`🧪 ${test.name}:`);
      console.log(`   ${test.description}`);
      const result = await test.testFunction();

      // Handle both void and boolean returns
      if (result === false) {
        throw new Error(`Test ${test.name} returned false`);
      }

      console.log(`✅ ${test.name} passed\n`);
      results.push({ name: test.name, passed: true });
    } catch (error) {
      console.error(`❌ ${test.name} failed:`, error instanceof Error ? error.message : error);
      console.log("");
      allPassed = false;
      results.push({ name: test.name, passed: false, error: error as Error });
    }
  }

  // Print summary
  console.log("\n" + "=".repeat(60));
  console.log("📊 Coherency Tests Summary:");
  console.log("=".repeat(60));

  for (const result of results) {
    const status = result.passed ? "✅ PASSED" : "❌ FAILED";
    console.log(`${status} - ${result.name}`);
    if (!result.passed && result.error) {
      console.log(`    Error: ${result.error.message}`);
    }
  }

  console.log("=".repeat(60));
  const passedCount = results.filter(r => r.passed).length;
  const totalCount = results.length;

  if (allPassed) {
    console.log(`🎉 All ${totalCount} coherency tests passed!`);
    process.exit(0);
  } else {
    console.log(`💥 ${totalCount - passedCount}/${totalCount} coherency tests failed!`);
    process.exit(1);
  }
}

// Run tests if this script is called directly
if (import.meta.url.endsWith(process.argv[1])) {
  runCoherencyTests().catch(console.error);
}

export { runCoherencyTests };

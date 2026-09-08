#!/usr/bin/env node

/**
 * This file is part of helpers4.
 * Copyright (C) 2025 baxyz
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import fs from 'fs-extra';
import path from 'node:path';

interface ShardManifest {
  shard: number;
  files: string[];
}

interface MutationTestResult {
  files: Record<string, unknown>;
  testFiles?: Record<string, unknown>;
  [key: string]: unknown;
}

/**
 * Combines each shard's mutation report into one project-wide result.
 *
 * Each shard runs Stryker with `--mutate` restricted to its own file subset, but incremental
 * mode still carries forward every other file's result from the baseline into that shard's own
 * report — so every shard's report already covers the whole project, just with only its own
 * subset freshly tested. The manifest tells us which files each shard actually owns, so for
 * every file we take the one shard's entry that's fresh rather than a stale carried-forward
 * copy duplicated across the others.
 */
async function main(): Promise<void> {
  const [shardsDir, outFile, expectedShardCountArg] = process.argv.slice(2);
  if (!shardsDir || !outFile || !expectedShardCountArg) {
    throw new Error(
      'Usage: merge-shards.ts <shardsDir> <outFile> <expectedShardCount>',
    );
  }
  const expectedShardCount = Number(expectedShardCountArg);

  const shardDirNames = (await fs.readdir(shardsDir)).toSorted();
  // A shard whose job failed before its upload step never produces an artifact at all, so
  // `download-artifact`'s glob pattern just silently returns fewer directories — checking the
  // count here is the only way to catch that rather than merging a quietly incomplete result.
  if (shardDirNames.length !== expectedShardCount) {
    throw new Error(
      `Expected ${expectedShardCount} shard artifact(s), found ${shardDirNames.length}: ` +
        `[${shardDirNames.join(', ')}]. A shard's job likely failed before it could upload its report.`,
    );
  }

  let merged: MutationTestResult | undefined;
  const missing: string[] = [];

  for (const dirName of shardDirNames) {
    const dir = path.join(shardsDir, dirName);
    const manifest: ShardManifest = await fs.readJson(
      path.join(dir, 'manifest.json'),
    );
    const report: MutationTestResult = await fs.readJson(
      path.join(dir, 'mutation.json'),
    );

    if (!merged) {
      merged = { ...report, files: {}, testFiles: {} };
    }
    merged.testFiles = { ...merged.testFiles, ...report.testFiles };

    for (const file of manifest.files) {
      if (file in report.files) {
        merged.files[file] = report.files[file];
      } else {
        missing.push(`${file} (shard ${manifest.shard})`);
      }
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `${missing.length} file(s) owned by a shard have no result in that shard's report ` +
        `— its run likely failed before completing:\n${missing.join('\n')}`,
    );
  }

  await fs.ensureDir(path.dirname(outFile));
  await fs.writeJson(outFile, merged);
  console.log(
    `Merged ${shardDirNames.length} shard report(s) covering ${Object.keys(merged!.files).length} file(s) into ${outFile}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

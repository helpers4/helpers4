/**
 * This file is part of helpers4.
 * Copyright (C) 2025 baxyz
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/**
 * Compares two semantic version strings
 * @param version1 - First version string
 * @param version2 - Second version string
 * @returns -1 if version1 < version2, 0 if equal, 1 if version1 > version2
 */
export function compare(version1: string, version2: string): number {
  const normalize = (v: string) => v.replace(/^v/, '');
  const v1 = normalize(version1);
  const v2 = normalize(version2);

  const parts1 = v1.split('.').map(Number);
  const parts2 = v2.split('.').map(Number);

  const maxLength = Math.max(parts1.length, parts2.length);

  for (let i = 0; i < maxLength; i++) {
    const part1 = parts1[i] || 0;
    const part2 = parts2[i] || 0;

    if (part1 < part2) return -1;
    if (part1 > part2) return 1;
  }

  return 0;
}

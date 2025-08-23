/**
 * This file is part of helpers4.
 * Copyright (C) 2025 baxyz
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/**
 * Check if a given value of unknown data type is defined and not null
 * @param value
 */
export function isDefinedAndNotNull<T>(value: T | undefined | null): boolean {
    return value !== undefined && value !== null;
}


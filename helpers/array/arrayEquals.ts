/**
 * This file is part of helpers4.
 * Copyright (C) 2025 baxyz
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { isArray, isObject } from "radashi";
import { deepCompare } from "simple-deepcompare";

/**
 * Simple helper that checks if two lists are identical.
 * The order of elements in the list is not important.
 *
 * @param arr1 One list
 * @param arr2 Another list
 * @returns `true` if the list contain the same items, `false` otherwise.
 */
export function arrayEquals<T>(arr1: T[], arr2: T[]): boolean {
    return arr1.length === arr2.length && arr1.every((v1) => arr2.some((v2) => {
        if (isObject(v1) && isObject(v2)) {
            return deepCompare(v1, v2);
        }
        if (isArray(v1) && isArray(v2)) {
            return arrayEquals(v1, v2);
        }
        return v1 === v2;
    }));
}

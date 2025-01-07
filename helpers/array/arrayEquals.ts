import { isArray, isObject } from "radashi";
import { deepCompare } from "simple-deepcompare";

/**
 * Simple helper that checks if two lists are identical.
 * The order of elements in the list is not important.
 *
 * @param a One list
 * @param b Another list
 * @returns `true` if the list contain the same items, `false` otherwise.
 */
export function arrayEquals<T>(a: Array<T>, b: Array<T>): boolean {
    return a.length === b.length && a.every((v1) => b.some((v2) => {
        if (isObject(v1) && isObject(v2)) {
            return deepCompare(v1, v2);
        }
        if (isArray(v1) && isArray(v2)) {
            return arrayEquals(v1, v2);
        }
        return v1 === v2;
    }));
}

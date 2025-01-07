/**
 * Compute the intersection of two arrays, meaning the elements that are present
 * in both arrays.
 *
 * @param a First array
 * @param b Second array
 * @returns The intersection of the two arrays
 */
export function intersection<T>(a: readonly T[], b: readonly T[]): T[] {
    return a.filter((v) => b.includes(v));
}

import { isNullish } from "radashi";

/**
 * Remove null and undefined values from an object.
 *
 * @param obj an object
 * @returns A shallow copy of the object without null or undefined values
 */
export function removeUndefinedNull<T extends Record<string, string | boolean | number>>(obj: T): T;

/**
 * Remove null and undefined values from an object.
 *
 * @param obj a null object
 * @returns null
 */
export function removeUndefinedNull<T extends Record<string, string | boolean | number>>(obj: null): null;

/**
 * Remove null and undefined values from an object.
 *
 * @param obj an undefined object
 * @returns undefined
 */
export function removeUndefinedNull<T extends Record<string, string | boolean | number>>(obj: undefined): undefined;

/**
 * Remove null and undefined values from an object.
 *
 * @param obj an object
 * @returns A shallow copy of the object without null or undefined values
 */
export function removeUndefinedNull<T extends Record<string, string | boolean | number>>(obj: T | null | undefined): T | null | undefined {
  return obj ? Object.entries(obj)
    .filter(([_, v]) => !isNullish(v))
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), <T>{}) : obj;
}


import { isDefinedAndNotNull } from './isDefinedAndNotNull';

/**
 * Return a value or throw an error is null or undefined.
 *
 * @param value A possible non-defined value.
 * @param error The error message to throw.
 * @returns A defined value or an error.
 */
export function returnOrThrowError<T>(value: T | undefined | null, error: string): T {
    if (isDefinedAndNotNull(value)) {
        return value!;
    } else {
        throw new Error(error);
    }
}

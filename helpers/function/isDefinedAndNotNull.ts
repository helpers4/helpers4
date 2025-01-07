/**
 * Check if a given value of unknown data type is defined and not null
 * @param value
 */
export function isDefinedAndNotNull<T>(value: T | undefined | null): boolean {
    return value !== undefined && value !== null;
}


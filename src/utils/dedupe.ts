/**
 * Removes duplicate elements from an array
 * @param array The input array to deduplicate
 * @returns A new array with duplicate elements removed
 */
export const dedupe = <T>(array: T[]): T[] => [...new Set(array)];

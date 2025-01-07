import { arrayEquals } from './arrayEquals';

describe('arrayEquals', () => {
    it('should return true if two arrays are identical', () => {
        expect(arrayEquals([1, 2, 3], [3, 2, 1])).toBe(true);
    });

    it('should return false if two arrays are not identical', () => {
        expect(arrayEquals([1, 2, 3], [4, 5, 6])).toBe(false);
    });

    it('should return true for nested arrays if they are identical', () => {
        expect(arrayEquals([[1, 2], [3, 4]], [[3, 4], [1, 2]])).toBe(true);
    });

    it('should return false for nested arrays if they are not identical', () => {
        expect(arrayEquals([[1, 2], [3, 4]], [[1, 2], [4, 5]])).toBe(false);
    });
});

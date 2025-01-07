import { intersection } from './intersection';

describe('intersection', () => {
    it('should return the intersection of two arrays', () => {
        expect(intersection([1, 2, 3], [2, 3, 4])).toEqual([2, 3]);
    });

    it('should return an empty array if there is no intersection', () => {
        expect(intersection([1, 2, 3], [4, 5, 6])).toEqual([]);
    });

    it('should return the same array if both arrays are identical', () => {
        expect(intersection([1, 2, 3], [1, 2, 3])).toEqual([1, 2, 3]);
    });
});

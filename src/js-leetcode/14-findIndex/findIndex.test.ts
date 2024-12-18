import { vi } from 'vitest';
import findIndex from './findIndex';

describe('findIndex', () => {
  describe('basic functionality', () => {
    it('should find first matching element index', () => {
      const numbers = [1, 2, 3, 4, 5];
      expect(findIndex(numbers, (n) => n > 3)).toBe(3);
    });

    it('should return -1 when no element matches', () => {
      const numbers = [1, 2, 3];
      expect(findIndex(numbers, (n) => n > 5)).toBe(-1);
    });
  });

  describe('fromIndex parameter', () => {
    const numbers = [1, 2, 3, 4, 5];

    it('should start search from given index', () => {
      expect(findIndex(numbers, (n) => n > 1, 2)).toBe(2);
    });

    it('should return -1 when fromIndex is out of bounds', () => {
      expect(findIndex(numbers, (n) => n > 0, 10)).toBe(-1);
      expect(findIndex(numbers, (n) => n > 0, -1)).toBe(-1);
    });
  });

  describe('predicate context', () => {
    it('should pass correct arguments to predicate', () => {
      const array = ['a', 'b', 'c'];
      const predicate = vi.fn();

      findIndex(array, predicate);

      expect(predicate).toHaveBeenCalledWith('a', 0, array);
    });
  });

  describe('edge cases', () => {
    it('should handle empty arrays', () => {
      expect(findIndex([], () => true)).toBe(-1);
    });

    it('should handle arrays with undefined/null', () => {
      const array = [undefined, null, 0];
      expect(findIndex(array, (x) => x === null)).toBe(1);
    });
  });
});

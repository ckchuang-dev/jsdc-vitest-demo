import { cloneDeepWithRecursion as cloneDeep } from './cloneDeep';

describe('cloneDeep', () => {
  describe('primitive values', () => {
    it('should handle null', () => {
      expect(cloneDeep(null)).toBeNull();
    });

    it('should handle undefined', () => {
      expect(cloneDeep(undefined)).toBeUndefined();
    });

    it('should handle numbers', () => {
      expect(cloneDeep(123)).toBe(123);
      expect(cloneDeep(Infinity)).toBe(Infinity);
      expect(cloneDeep(NaN)).toBeNaN();
    });
  });

  describe('objects', () => {
    it('should deeply clone nested objects', () => {
      const original = {
        a: 1,
        b: { c: 2, d: { e: 3 } },
      };
      const cloned = cloneDeep(original);

      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);
      expect(cloned.b).not.toBe(original.b);
      expect(cloned.b.d).not.toBe(original.b.d);
    });

    it('should handle arrays', () => {
      const original = [1, [2, [3]]];
      const cloned = cloneDeep(original);

      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);
      expect(cloned[1]).not.toBe(original[1]);
    });

    it('should handle Date objects', () => {
      const date = new Date();
      const cloned = cloneDeep(date);

      expect(cloned).toEqual(date);
      expect(cloned).not.toBe(date);
    });

    it('should handle RegExp objects', () => {
      const regexp = /test/gi;
      const cloned = cloneDeep(regexp);

      expect(cloned).toEqual(regexp);
      expect(cloned).not.toBe(regexp);
    });
  });

  describe('special cases', () => {
    it('should handle circular references', () => {
      const original: any = { a: 1 };
      original.self = original;

      const cloned = cloneDeep(original);
      expect(cloned).toEqual(original);
      expect(cloned.self).toBe(cloned);
    });

    it('should preserve prototype chain', () => {
      class TestClass {
        name: string;
        constructor() {
          this.name = 'test';
        }
        greet() {
          return `Hello ${this.name}`;
        }
      }

      const original = new TestClass();
      const cloned = cloneDeep(original);

      expect(cloned instanceof TestClass).toBe(true);
      expect(cloned.greet()).toBe('Hello test');
    });
  });
});

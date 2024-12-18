import isEqual from './isEqual';

interface CircularObj {
  a: number;
  self?: CircularObj;
}

describe('isEqual', () => {
  describe('primitive values', () => {
    it('should compare numbers correctly', () => {
      expect(isEqual(1, 1)).toBe(true);
      expect(isEqual(1, 2)).toBe(false);
      expect(isEqual(NaN, NaN)).toBe(true);
      expect(isEqual(0, -0)).toBe(false);
    });

    it('should compare strings correctly', () => {
      expect(isEqual('hello', 'hello')).toBe(true);
      expect(isEqual('hello', 'world')).toBe(false);
    });

    it('should compare boolean values correctly', () => {
      expect(isEqual(true, true)).toBe(true);
      expect(isEqual(false, false)).toBe(true);
      expect(isEqual(true, false)).toBe(false);
    });

    it('should handle null and undefined', () => {
      expect(isEqual(null, null)).toBe(true);
      expect(isEqual(undefined, undefined)).toBe(true);
      expect(isEqual(null, undefined)).toBe(false);
    });
  });

  describe('objects', () => {
    it('should compare flat objects', () => {
      expect(isEqual({ a: 1 }, { a: 1 })).toBe(true);
      expect(isEqual({ a: 1 }, { a: 2 })).toBe(false);
      expect(isEqual({ a: 1 }, { b: 1 })).toBe(false);
    });

    it('should compare nested objects', () => {
      expect(isEqual({ a: { b: 2 } }, { a: { b: 2 } })).toBe(true);

      expect(isEqual({ a: { b: 2 } }, { a: { b: 3 } })).toBe(false);
    });

    it('should compare arrays', () => {
      expect(isEqual([1, 2, 3], [1, 2, 3])).toBe(true);
      expect(isEqual([1, 2, 3], [1, 2, 4])).toBe(false);
      expect(isEqual([1, [2, 3]], [1, [2, 3]])).toBe(true);
    });
  });

  describe('special cases', () => {
    it('should handle circular references', () => {
      const obj1: CircularObj = { a: 1 };
      const obj2: CircularObj = { a: 1 };

      obj1.self = obj1;
      obj2.self = obj2;

      expect(isEqual(obj1, obj2)).toBe(true);
    });

    it('should handle Date objects', () => {
      const date = new Date();
      expect(isEqual(date, new Date(date))).toBe(true);
      expect(isEqual(date, new Date(date.getTime() + 1))).toBe(false);
    });

    it('should handle RegExp objects', () => {
      expect(isEqual(/abc/g, /abc/g)).toBe(true);
      expect(isEqual(/abc/g, /def/g)).toBe(false);
    });
  });
});

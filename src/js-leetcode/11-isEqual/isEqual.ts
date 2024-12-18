const isEqual = <T, U>(a: T, b: U, seen = new WeakMap()): boolean => {
  // Handle primitives and same reference
  if (Object.is(a, b)) return true;

  // Handle NaN
  if (typeof a === 'number' && typeof b === 'number' && isNaN(a) && isNaN(b)) return true;

  // If either value is primitive after above checks, they're not equal
  if (a === null || b === null || typeof a !== 'object' || typeof b !== 'object')
    return false;

  // Handle 0 and -0 (Object.is already handles this correctly)
  if (Object.is(a, 0) && Object.is(b, -0)) return false;

  // Handle circular references
  if (seen.has(a)) return seen.get(a) === b;
  seen.set(a, b);

  // Handle Date objects
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  // Handle RegExp objects
  if (a instanceof RegExp && b instanceof RegExp) {
    return a.source === b.source && a.flags === b.flags;
  }

  // Handle Array comparison
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((item, index) => isEqual(item, b[index], seen));
  }

  // Handle object comparison
  const keys1 = Object.keys(a);
  const keys2 = Object.keys(b);

  if (keys1.length !== keys2.length) return false;

  return keys1.every(
    (key) =>
      Object.prototype.hasOwnProperty.call(b, key) &&
      isEqual(
        (a as Record<string, object | null>)[key],
        (b as Record<string, object | null>)[key],
        seen
      )
  );
};

export default isEqual;

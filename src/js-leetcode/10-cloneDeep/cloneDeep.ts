// solution 1. - JSON.stringify() and JSON.parse()
const cloneDeepWithJSONParse = <T>(item: T) => JSON.parse(JSON.stringify(item));

// solution 2. - structuredClone
const cloneDeepWithStructuredClone = <T>(item: T) => structuredClone(item);

// solution 3.
const cloneDeepWithRecursion = <T>(item: T, cache = new WeakMap()): T => {
  // handle primitive value and null
  if (item === null || typeof item !== 'object') {
    return item;
  }

  // handle circular references
  if (cache.has(item)) {
    return cache.get(item);
  }

  // handle special objects such as Date, RegExp, Function
  if (item instanceof Date) {
    return new Date(item) as T;
  }

  if (item instanceof RegExp) {
    return new RegExp(item) as T;
  }

  if (typeof item === 'function') {
    return item;
  }

  // handle array and object
  const result = (
    Array.isArray(item) ? [] : Object.create(Object.getPrototypeOf(item))
  ) as T;

  // set current result into cache to prevent circular reference issue
  cache.set(item, result);

  // run a for loop with input object
  for (const key of Object.keys(item)) {
    const value = item[key as keyof typeof item];

    // recursively run with each value
    result[key as keyof T] = cloneDeepWithRecursion(value, cache);
  }

  // return cloned object
  return result;
};

export { cloneDeepWithJSONParse, cloneDeepWithStructuredClone, cloneDeepWithRecursion };

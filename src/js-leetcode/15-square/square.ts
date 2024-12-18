declare global {
  interface Array<T> {
    square(): T[];
  }
}

Array.prototype.square = function <T>(): T[] {
  return this.map<T>((item: T) => (Number(item) * Number(item)) as T);
};

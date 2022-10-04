export function removeFromArray<T>(
  list: Array<T>,
  index: number
): [T, Array<T>] {
  const result = Array.from(list);
  const [removedItem] = result.splice(index, 1);
  return [removedItem, result];
}

export function addToArray<T>(
  list: Array<T>,
  index: number,
  element: T
): Array<T> {
  const result = Array.from(list);
  result.splice(index, 0, element);
  return result;
}

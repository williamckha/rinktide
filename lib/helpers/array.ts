/**
 * Partitions an array into two groups, the first of which
 * contains elements `predicate` returns truthy for, and
 * the second of which contains elements `predicate` returns
 * falsey for.
 *
 * @param array the array to partition
 * @param predicate the function invoked for each element
 * @returns the array of grouped elements
 */
export const partition = <T>(
  array: T[],
  predicate: (element: T) => boolean,
): [T[], T[]] => {
  const pass: T[] = [];
  const fail: T[] = [];
  array.forEach((element) => (predicate(element) ? pass : fail).push(element));
  return [pass, fail];
};

export const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
  arr.reduce(
    (groups, item) => {
      (groups[key(item)] ||= []).push(item);
      return groups;
    },
    {} as Record<K, T[]>,
  );

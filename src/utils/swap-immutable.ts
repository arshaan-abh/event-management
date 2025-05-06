export const swapImmutable = <T>(arr: T[], i: number, j: number): T[] => {
  if (i >= 0 && j >= 0 && i < arr.length && j < arr.length) {
    const newArr = [...arr];
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    return newArr;
  } else {
    throw new Error("Index out of bounds");
  }
};

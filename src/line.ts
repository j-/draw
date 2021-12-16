import { ContiguousLine } from './contiguous-line';

export const simplifyLine = (line: ContiguousLine) => {
  if (line.length < 2) {
    return [];
  }

  return line.filter((point, i, arr) => (
    i === arr.length - 1 ||
    point[0] !== arr[i + 1][0] ||
    point[1] !== arr[i + 1][1]
  ));
};

import { ContiguousLine } from './contiguous-line';
import { Point } from './point';

type LineFilter = (value: Point, index: number, array: ContiguousLine) => boolean;

const lineFilterDuplicates: LineFilter = (point, i, arr) => (
  i === arr.length - 1 ||
  point[0] !== arr[i + 1][0] ||
  point[1] !== arr[i + 1][1]
);

const lineFilterRedundant: LineFilter = (currentPoint, i, arr) => {
  if (i === 0 || i === arr.length - 1) return true;
  const lastPoint = arr[i - 1];
  const nextPoint = arr[i + 1];
  const currentTheta = Math.atan2(
    currentPoint[0] - lastPoint[0],
    currentPoint[1] - lastPoint[1]
  );
  const nextTheta = Math.atan2(
    nextPoint[0] - lastPoint[0],
    nextPoint[1] - lastPoint[1]
  );
  return currentTheta !== nextTheta;
};

const lineFilter: LineFilter = (currentPoint, i, arr) => (
  lineFilterDuplicates(currentPoint, i, arr) &&
  lineFilterRedundant(currentPoint, i, arr)
);

export const simplifyLine = (line: ContiguousLine): ContiguousLine => {
  if (line.length < 2) {
    return [];
  }

  return line.filter(lineFilter);
};

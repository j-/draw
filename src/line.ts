import { ContiguousLine } from './contiguous-line';
import { Point } from './point';

const lineFilter = (currentPoint: Point, i: number, arr: ContiguousLine): boolean => {
  // Check for duplicate points.
  if (i !== arr.length - 1) {
    const nextPoint = arr[i + 1];
    if (
      currentPoint[0] === nextPoint[0] &&
      currentPoint[1] === nextPoint[1]
    ) {
      return false;
    }
  }
  // Check for redundant points in a straight line.
  if (i !== 0 && i !== arr.length - 1) {
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
    if (currentTheta === nextTheta) {
      return false;
    }
  }
  // Allow all other points.
  return true;
};

export const simplifyLine = (line: ContiguousLine): ContiguousLine => {
  if (line.length < 2) {
    return [];
  }

  return line.filter(lineFilter);
};

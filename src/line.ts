import { ContiguousLine } from './contiguous-line';

export const simplifyLine = (line: ContiguousLine) => {
  if (line.length < 2) {
    return [];
  }

  return line
    .filter((point, i, arr) => (
      i === arr.length - 1 ||
      point[0] !== arr[i + 1][0] ||
      point[1] !== arr[i + 1][1]
    ))
    .filter((currentPoint, i, arr) => {
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
    });
};

import { Point } from './point';

/** A contiguous line is a collection of points that form a single line. */
export type ContiguousLine = Point[];

export const buildContiguousLinePathDefinitionAbsolute = (points: ContiguousLine): string => (
  points.length < 2 ? '' :
  points
    .map(([x, y], i) => {
      const coords = y < 0 ? `${x}${y}` : `${x} ${y}`;
      return (
        // Move to these coords
        i === 0 ? `M${coords}` :
        // Repeat last instruction
        x < 0 ? coords : ` ${coords}`
      );
    })
    .join('')
);

export const buildContiguousLinePathDefinitionRelative = (points: ContiguousLine): string => {
  if (points.length < 2) {
    return '';
  }

  const result: ContiguousLine = [points[0]];

  for (let i = points.length - 1; i >= 1; i--) {
    const currentPoint = points[i];
    const lastPoint = points[i - 1];
    const relativePoint: Point = [
      currentPoint[0] - lastPoint[0],
      currentPoint[1] - lastPoint[1],
    ];
    result[i] = relativePoint;
  }

  return result
    .map(([x, y], i) => {
      const coords = y < 0 ? `${x}${y}` : `${x} ${y}`;
      return (
        // Move to these coords
        i === 0 ? `M${coords}` :
        // Line to these coords
        i === 1 ? `l${coords}` :
        // Repeat last instruction
        x < 0 ? coords : ` ${coords}`
      );
    })
    .join('');
};

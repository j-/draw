import { Point } from './point';

/** A contiguous line is a collection of points that form a single line. */
export type ContiguousLine = Point[];

export const buildContiguousLinePathDefinition = (points: ContiguousLine): string => (
  points
    .map(([x, y]) => `${x},${y}`)
    .map((coords, i) => (
      // Move to these coords
      i === 0 ? `M ${coords}` :
      // Line to these coords
      i === 1 ? `L ${coords}` :
      // Repeat last instruction
      coords
    ))
    .join(' ')
);

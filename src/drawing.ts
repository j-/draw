import { CompositeLine } from './composite-line';

export type LineStyles = {
  strokeColor: string;
  strokeWidth: number;
};

export type StyledLine = [LineStyles, CompositeLine];

export type Drawing = StyledLine[];

export const isSameStyle = (a: LineStyles, b: LineStyles) => (
  a.strokeColor === b.strokeColor &&
  a.strokeWidth === b.strokeWidth
);

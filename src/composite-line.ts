import { ContiguousLine, buildContiguousLinePathDefinition } from './contiguous-line';

/** A composite line is a collection of contiguous lines of the same style. */
export type CompositeLine = ContiguousLine[];

export const buildCompositeLinePathDefinition = (lines: CompositeLine): string => (
  lines
    .map(buildContiguousLinePathDefinition)
    .join(' ')
);

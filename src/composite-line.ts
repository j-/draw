import { ContiguousLine, buildContiguousLinePathDefinitionAbsolute } from './contiguous-line';

/** A composite line is a collection of contiguous lines of the same style. */
export type CompositeLine = ContiguousLine[];

export const buildCompositeLinePathDefinitionAbsolute = (lines: CompositeLine): string => (
  lines
    .map(buildContiguousLinePathDefinitionAbsolute)
    .join(' ')
);

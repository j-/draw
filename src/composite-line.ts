import {
  buildContiguousLinePathDefinitionAbsolute,
  buildContiguousLinePathDefinitionRelative,
  ContiguousLine,
} from './contiguous-line';

/** A composite line is a collection of contiguous lines of the same style. */
export type CompositeLine = ContiguousLine[];

export const buildCompositeLinePathDefinitionAbsolute = (lines: CompositeLine): string => (
  lines
    .map(buildContiguousLinePathDefinitionAbsolute)
    .join(' ')
);

export const buildCompositeLinePathDefinitionRelative = (lines: CompositeLine): string => (
  lines
    .map(buildContiguousLinePathDefinitionRelative)
    .join(' ')
);

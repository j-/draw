import {
  buildContiguousLinePathDefinitionAbsolute,
  buildContiguousLinePathDefinitionRelative,
  ContiguousLine,
} from './contiguous-line';

const zeroPointsLine: ContiguousLine = [];

const onePointLine: ContiguousLine = [[20, 30]];

const twoPointsLine: ContiguousLine = [[20, 30], [30, 30]];

const threePointsLine: ContiguousLine = [[20, 30], [30, 30], [40, 20]];

const complexLine: ContiguousLine = [[0, -2], [-1, -1], [-2, 0], [-1, 1], [0, 2], [1, 1], [2, 0], [1, -1]];

describe('buildContiguousLinePathDefinitionAbsolute()', () => {
  it('returns an empty string if given no coords', () => {
    const actual = buildContiguousLinePathDefinitionAbsolute(zeroPointsLine);
    expect(actual).toEqual('');
  });

  it('returns an empty string if given one coord', () => {
    const actual = buildContiguousLinePathDefinitionAbsolute(onePointLine);
    expect(actual).toEqual('');
  });

  it('returns a line if given two coords', () => {
    const actual = buildContiguousLinePathDefinitionAbsolute(twoPointsLine);
    expect(actual).toEqual('M20 30 30 30');
  });

  it('returns a line with two segments if given three coords', () => {
    const actual = buildContiguousLinePathDefinitionAbsolute(threePointsLine);
    expect(actual).toEqual('M20 30 30 30 40 20');
  });

  it('returns complex line if given a complex set of coords', () => {
    const actual = buildContiguousLinePathDefinitionAbsolute(complexLine);
    expect(actual).toEqual('M0-2-1-1-2 0-1 1 0 2 1 1 2 0 1-1');
  });
});

describe('buildContiguousLinePathDefinitionRelative()', () => {
  it('returns an empty string if given no coords', () => {
    const actual = buildContiguousLinePathDefinitionRelative(zeroPointsLine);
    expect(actual).toEqual('');
  });

  it('returns an empty string if given one coord', () => {
    const actual = buildContiguousLinePathDefinitionRelative(onePointLine);
    expect(actual).toEqual('');
  });

  it('returns a line if given two coords', () => {
    const actual = buildContiguousLinePathDefinitionRelative(twoPointsLine);
    expect(actual).toEqual('M20 30l10 0');
  });

  it('returns a line with two segments if given three coords', () => {
    const actual = buildContiguousLinePathDefinitionRelative(threePointsLine);
    expect(actual).toEqual('M20 30l10 0 10-10');
  });

  it('returns complex line if given a complex set of coords', () => {
    const actual = buildContiguousLinePathDefinitionRelative(complexLine);
    expect(actual).toEqual('M0-2l-1 1-1 1 1 1 1 1 1-1 1-1-1-1');
  });
});

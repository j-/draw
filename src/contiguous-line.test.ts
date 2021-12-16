import { buildContiguousLinePathDefinitionAbsolute, ContiguousLine } from './contiguous-line';

const zeroPointsLine: ContiguousLine = [];

const onePointLine: ContiguousLine = [[20, 30]];

const twoPointsLine: ContiguousLine = [[20, 30], [30, 30]];

const threePointsLine: ContiguousLine = [[20, 30], [30, 30], [40, 20]];

describe('buildContiguousLinePathDefinitionAbsolute()', () => {
  it('returns an empty string if given no coords', () => {
    const actual = buildContiguousLinePathDefinitionAbsolute(zeroPointsLine);
    expect(actual).toEqual('');
  });

  it('returns a move instruction if given one coord', () => {
    const actual = buildContiguousLinePathDefinitionAbsolute(onePointLine);
    expect(actual).toEqual('M 20,30');
  });

  it('returns a line if given two coords', () => {
    const actual = buildContiguousLinePathDefinitionAbsolute(twoPointsLine);
    expect(actual).toEqual('M 20,30 L 30,30');
  });

  it('returns a line with two segments if given three coords', () => {
    const actual = buildContiguousLinePathDefinitionAbsolute(threePointsLine);
    expect(actual).toEqual('M 20,30 L 30,30 40,20');
  });
});

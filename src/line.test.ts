import { ContiguousLine } from './contiguous-line';
import { simplifyLine } from './line';

describe('simplifyLine()', () => {
  it('returns an empty array if given a line with zero points', () => {
    const actual = simplifyLine([]);
    expect(actual).toEqual([]);
  });

  it('returns an empty array if given a line with a single point', () => {
    const actual = simplifyLine([[20, 30]]);
    expect(actual).toEqual([]);
  });

  it('returns a line if given a line with a two points', () => {
    const actual = simplifyLine([[20, 30], [30, 30]]);
    expect(actual).toEqual([[20, 30], [30, 30]]);
  });

  it('removes duplicate points', () => {
    const actual = simplifyLine([[20, 30], [30, 30], [30, 30], [40, 20]]);
    expect(actual).toEqual([[20, 30], [30, 30], [40, 20]]);
  });

  it('removes 3x duplicate points', () => {
    const actual = simplifyLine([[20, 30], [30, 30], [30, 30], [30, 30], [40, 20]]);
    expect(actual).toEqual([[20, 30], [30, 30], [40, 20]]);
  });

  it('removes duplicate points at start of line', () => {
    const actual = simplifyLine([[20, 30], [20, 30], [30, 30], [40, 20]]);
    expect(actual).toEqual([[20, 30], [30, 30], [40, 20]]);
  });

  it('removes duplicate points at end of line', () => {
    const actual = simplifyLine([[20, 30], [30, 30], [40, 20], [40, 20]]);
    expect(actual).toEqual([[20, 30], [30, 30], [40, 20]]);
  });

  it('removes redundant points along a line', () => {
    const actual = simplifyLine([[0, 0], [5, 5], [10, 10], [20, 20]]);
    expect(actual).toEqual([[0, 0], [20, 20]]);
  });

  it.skip('simplifies a complex line', () => {
    const complexLine: ContiguousLine = [[-4, -5], [-4, -5], [-4, -5], [-4, -4], [-4, -3], [-4, -3], [-4, -2], [-4, -2], [-4, -1], [-4, 0], [-4, 1], [-4, 2], [-3, 2], [-2, 3], [-2, 3], [-1, 3], [-1, 3], [0, 3], [0, 3], [1, 3], [2, 3], [3, 3], [3, 3], [3, 3], [4, 3], [4, 3], [5, 3], [5, 3], [5, 3], [5, 2], [5, 2], [5, 1], [5, 1], [5, -3], [5, -4]];
    const actual = simplifyLine(complexLine);
    expect(actual).toEqual([[-4, -5], [-4, -2], [-3, 2], [-2, 3], [5, 3], [5, -4]]);
  });
});

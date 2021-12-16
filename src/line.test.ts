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
});

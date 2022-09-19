import { describe, it, expect } from 'vitest';
import { countSqSumElement, getNumList } from './calculate';

describe('getNumList', () => {
  it('returns square sum list', () => {
    expect(getNumList({ N: 400, a: 3, b: 1, allowNegative: false }))
      .toEqual([1, 16, 49, 100, 169, 256, 361]);

    expect(getNumList({ N: 400, a: 3, b: 1, allowNegative: true }))
      .toEqual([1, 4, 16, 25, 49, 64, 100, 121, 169, 196, 256, 289, 361, 400]);
  });
});

describe('countSqSumElement', () => {
  it('returns square sum element count', () => {
    expect(countSqSumElement(1, [1])).toBe(1);
    expect(countSqSumElement(25, [1, 2, 3])).toBe(5);
  });

  it('nums cannot be empty array', async () => {
    expect(() => countSqSumElement(1, [])).toThrow('No Nums');
  });

  it('If there is no solution, throw Impossible error', () => {
    expect(() => countSqSumElement(5, [2])).toThrowError('Impossible');
  });
});

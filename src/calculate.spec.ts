import { describe, it, expect } from 'vitest';
import { getNumList } from './calculate';

describe('calculate', () => {
  it('getNumList', () => {
    expect(getNumList({ N: 400, a: 3, b: 1, allowNegative: false }))
      .toEqual([1, 16, 49, 100, 169, 256, 361]);

    expect(getNumList({ N: 400, a: 3, b: 1, allowNegative: true }))
      .toEqual([1, 4, 16, 25, 49, 64, 100, 121, 169, 196, 256, 289, 361, 400]);
  });
});

import { describe, it, expect, beforeEach } from 'vitest';
import { calculate, countSqSumElement, getNumList } from './calculate';

describe('getNumList', () => {
  it('returns square sum list', () => {
    expect(getNumList({ N: 400, a: 3, b: 1, allowNegative: false }))
      .toEqual([1, 16, 49, 100, 169, 256, 361]);

    expect(getNumList({ N: 20, a: 3, b: 1, allowNegative: true }))
      .toEqual([1, 4, 16]);

    expect(getNumList({ N: 1, a: 1, b: -1, allowNegative: true }))
      .toEqual([1]);
  });

  it('excludes numbers if exclude has more than one elements', () => {
    expect(getNumList({ N: 20, a: 3, b: 1, allowNegative: true, exclude: [16] }))
      .toEqual([1, 4]);
  });
});

describe('countSqSumElement', () => {
  const memo = new Map<number, number>();

  beforeEach(() => {
    memo.clear();
    memo.set(0, 0);
  })

  it('returns square sum element count', () => {
    expect(countSqSumElement(1, [1], memo)).toBe(1);
    expect(countSqSumElement(25, [1, 4, 9], memo)).toBe(5);
  });

  it('returns -1 if there is no solution', () => {
    expect(countSqSumElement(5, [4], memo)).toBe(-1);
  });

  it('nums cannot be empty array', () => {
    expect(countSqSumElement(1, [], memo)).toBe(-1);
  });

  it('N cannot be negative', () => {
    expect(countSqSumElement(-1, [1], memo)).toBe(-1);
  });
});

describe('calucate', () => {
  it('returns square sum element count based on auto-generated array', () => {
    expect(calculate({ N: 400, a: 3, b: 1, allowNegative: false }).get(400))
      .toBe(4);

    expect(calculate({ N: 100_000, a: 3, b: 1, allowNegative: false }).size)
      .toBe(100_001);
  });

  it('stores -1 if the element has no solution', () => {
    expect(calculate({ N: 25, a: 3, b: 2, allowNegative: false }).get(1)).toBe(-1);
  });

  it('a and b cannot be both zero', () => {
    expect(() => calculate({ N: 1, a: 0, b: 0, allowNegative: false })).toThrowError('Zero Parameter');
  });
});

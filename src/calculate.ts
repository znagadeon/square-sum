type Parameter = {
  N: number,
  a: number,
  b: number,
  allowNegative: boolean,
};

export const getNumList = ({ N, a, b, allowNegative }: Parameter) => {
  const set = new Set<number>();

  if (allowNegative) {
    for (let i=-1; (a * i + b)**2<=N; i--) {
      set.add((a * i + b) ** 2);
    }
  }

  for (let i=0; (a * i + b)**2<=N; i++) {
    set.add((a * i + b) ** 2);
  }

  return Array.from(set).sort((a, b) => a-b);
};

export const countSqSumElement = (() => {
  const memo = new Map<number, number>();
  memo.set(0, 0);

  const run = (N: number, nums: number[], root: boolean = true) => {
    if (root) {
      memo.clear();
      memo.set(0, 0);
    }

    if (N < 0) throw new Error('Negative Number');
    if (nums.length === 0) throw new Error('No Nums');

    if (memo.has(N)) {
      return memo.get(N) as number;
    }

    const result = nums.map(v => {
      try {
        return run(N - v**2, nums, false);
      } catch (e) {
        return -1;
      }
    }).filter(v => v !== -1);
    if (result.length === 0) throw new Error('Impossible');

    memo.set(N, Math.min(...result) + 1);
    return memo.get(N) as number;
  };

  return run;
})();

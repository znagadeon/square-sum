type Parameter = {
  N: number,
  a: number,
  b: number,
  allowNegative: boolean,
  exclude?: number[],
};

const getNumList = ({ N, a, b, allowNegative, exclude = [] }: Parameter) => {
  const set = new Set<number>();

  if (allowNegative) {
    for (let i=-1; (a * i + b)**2<=N; i--) {
      set.add((a * i + b) ** 2);
    }
  }

  for (let i=0; (a * i + b)**2<=N; i++) {
    set.add((a * i + b) ** 2);
  }

  return Array.from(set)
    .filter(v => v !== 0 && !exclude.includes(v))
    .sort((a, b) => a-b);
};

const countSqSumElement = (N: number, nums: number[], memo: Map<number, number>) => {
  if (N < 0) return -1;
  if (nums.length === 0) return -1;

  if (memo.has(N)) {
    return memo.get(N) as number;
  }

  const result = nums
    .map(v => countSqSumElement(N - v, nums, memo))
    .filter(v => v > -1);

  if (result.length === 0) {
    memo.set(N, -1);
    return -1;
  }

  memo.set(N, Math.min(...result) + 1);
  return memo.get(N) as number;
};

const _calculate = ({ N, a, b, allowNegative, exclude = [] }: Parameter, cb?: (p: number) => void) => {
  if (a === 0 && b === 0) throw new Error('Zero Parameter');

  const nums = getNumList({ N, a, b, allowNegative, exclude });
  const memo = new Map<number, number>([
    [0, 0],
  ]);

  let percentage = 0;
  for (let i=1; i<=N; i++) {
    // requestIdleCallback(() => {
    //   countSqSumElement(i, nums, memo);

    //   if (Math.floor(i * 100 / N) > percentage) {
    //     percentage = Math.floor(i * 100 / N);
    //     cb && cb(percentage);
    //   }
    // });

    // 테스트용
    countSqSumElement(i, nums, memo);

    if (Math.floor(i * 100 / N) > percentage) {
      percentage = Math.floor(i * 100 / N);
      cb && cb(percentage);
    }
  }

  return memo;
}

module.exports = {
  calculate: _calculate,
};

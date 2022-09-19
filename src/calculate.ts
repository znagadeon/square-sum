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

  return Array.from(set).filter(v => v !== 0).sort((a, b) => a-b);
};

export const countSqSumElement = (N: number, nums: number[], memo: Map<number, number>) => {
  if (N < 0) return -1;
  if (nums.length === 0) return -1;

  if (memo.has(N)) {
    return memo.get(N) as number;
  }

  const result = nums.map((v, i) => {
    if (v > N) return -1;
    return countSqSumElement(N - v, nums, memo);
  }).filter(v => v > -1);
  if (result.length === 0) return -1;

  memo.set(N, Math.min(...result) + 1);
  return memo.get(N) as number;
};

export const calculate = ({ N, a, b, allowNegative }: Parameter) => {
  if (a === 0 && b === 0) throw new Error('Zero Parameter');

  const nums = getNumList({ N, a, b, allowNegative });
  const memo = new Map<number, number>([
    [0, 0],
  ]);

  let percentage = 0;
  for (let i=1; i<=N; i++) {
    // const result = countSqSumElement(i, nums.filter(v => v <= i), memo);
    // console.log(i, result);

    countSqSumElement(i, nums.filter(v => v<=i), memo);
    if (Math.floor(i * 100 / N) > percentage) {
      percentage = Math.floor(i * 100 / N);
      console.log(`${percentage}% calculated...`);
    }
  }

  return memo;
}

// calculate({ N: 1_000_000, a: 3, b: 1, allowNegative: false });

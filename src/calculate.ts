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

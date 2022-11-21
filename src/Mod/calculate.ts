export type CalculateReturnType = [number, number, number];

const shouldPass = (n: number) => {
  return n !== 0 && n % 3 === 0;
}

export const calculate = (N: number, divider: number, mod: number[]): CalculateReturnType => {
  for(let i=0; i**2 <= N; i++) {
    if (shouldPass(i)) continue;

    for (let j=0; i**2 + j**2 <= N && j<=i; j++) {
      if (shouldPass(j)) continue;

      for (let k=0; i**2 + j**2 + k**2 <= N && k<=j; k++) {
        if (shouldPass(k)) continue;

        const subtracted = N - i**2 - j**2 - k**2;

        if (!mod.includes(subtracted % divider)) continue;

        let dividedBy4 = subtracted;
        while (dividedBy4 % 4 === 0) {
          dividedBy4 >>= 2;
        }

        if (dividedBy4 % 8 === 7) continue;

        return [i, j, k];
      }
    }
  }

  return [-1, -1, -1];
};

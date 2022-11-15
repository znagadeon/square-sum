export type CalculateReturnType = [number, number, number];

export const calculate = (N: number, divider: number, mod: number[]): CalculateReturnType => {
  for(let i=0; i**2 <= N; i++) {
    if (i % 3 === 0) continue;

    for (let j=0; i**2 + j**2 <= N && j<=i; j++) {
      if (i % 3 === 0) continue;

      for (let k=0; i**2 + j**2 + k**2 <= N && k<=j; k++) {
        if (i % 3 === 0) continue;

        const subtracted = N - i**2 - j**2 - k**2;
        if (mod.includes(subtracted % divider)) return [i, j, k];
      }
    }
  }

  return [-1, -1, -1];
};

export type CalculateReturnType = [number, number, number];

export const calculate = (N: number, divider: number, mod: number[]): CalculateReturnType => {
  // N - a**2 - b**2 - c**2 === mod (mod divider)인 a, b, c 반환
  // a, b, c는 0보다 크거나 같은 정수, a, b, c의 mod 8은 7이 아님

  return [1, 2, 3];
};

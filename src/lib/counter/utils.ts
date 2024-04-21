export function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function clamp(value: number, min: number, max: number): number;
export function clamp(value: number, max: number): number;
export function clamp(v: number, i: number, j?: number) {
  if (typeof j === 'undefined') return v > i ? i : v;

  if (v < i) return i;
  if (v > j) return j;
  return v;
}
export function cx(...classes: (string | null | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

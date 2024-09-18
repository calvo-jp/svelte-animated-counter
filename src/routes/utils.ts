export function cx(...classes: (string | null | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

import { expect, test } from 'vitest';
import { clamp } from './clamp.js';

test('clamp', () => {
  expect(clamp(1, 5, 10)).toBe(5);
  expect(clamp(11, 5, 10)).toBe(10);
  expect(clamp(6, 5, 10)).toBe(6);
  expect(clamp(1, 10)).toBe(1);
  expect(clamp(11, 10)).toBe(10);
});

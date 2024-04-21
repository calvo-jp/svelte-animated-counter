import { expect, test } from 'vitest';
import { randInt } from './rand-int.js';

test('randInt', () => {
  const result = randInt(1, 10);
  expect(result).toBeGreaterThanOrEqual(1);
  expect(result).toBeLessThanOrEqual(10);
});

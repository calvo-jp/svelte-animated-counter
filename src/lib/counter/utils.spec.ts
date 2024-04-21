import { describe, expect, it } from 'vitest';
import { clamp, cx, randInt } from './utils.js';

describe('utils', () => {
  it('randInt', () => {
    const result = randInt(1, 10);
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(10);
  });

  it('clamp', () => {
    expect(clamp(1, 5, 10)).toBe(5);
    expect(clamp(11, 5, 10)).toBe(10);
    expect(clamp(6, 5, 10)).toBe(6);
    expect(clamp(1, 10)).toBe(1);
    expect(clamp(11, 10)).toBe(10);
  });

  it('cx', () => {
    expect(cx('class1', null, 'class2', undefined)).toBe('class1 class2');
  });
});

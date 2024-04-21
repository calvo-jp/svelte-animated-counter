import { expect, test } from 'vitest';
import { cx } from './cx.js';

test('cx', () => {
  expect(cx('class1', null, 'class2', undefined)).toBe('class1 class2');
});

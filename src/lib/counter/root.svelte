<script lang="ts">
  import type { Snippet } from 'svelte';
  import { clamp, cx, randInt } from './utils';

  interface Props {
    /**
     * @default 1000000
     */
    min?: number;
    /**
     * @default 9999999
     */
    max?: number;
    /**
     * @default [50, 100]
     */
    step?: number | [min: number, max: number];
    /**
     * @default 1500
     */
    interval?: number;
    /**
     * Set initial value of instead of random
     */
    initialValue?: number;
    children: Snippet<
      [
        | {
            type: 'item';
            value: number;
          }
        | {
            type: 'separator';
            value?: never;
          },
      ]
    >;
    class?: string;
    style?: string;
  }

  let {
    min = 1000000,
    max = 9999999,
    step = [50, 100],
    interval = 1500,
    initialValue,
    children,
    style,
    class: className,
  }: Props = $props();

  let stepMin = $derived(Array.isArray(step) ? step[0] : step);
  let stepMax = $derived(Array.isArray(step) ? step[1] : step);

  let currentValue = $state(
    initialValue ? clamp(initialValue, min, max) : randInt(min, max),
  );

  let values = $derived.by(() => {
    let d = max.toString().length;
    let s = currentValue.toString().padStart(d, '0');
    let l = s.split('');

    l.reverse();

    let v = l
      .map((j, i) => (i > 0 && i % 3 === 0 ? [null, j] : j))
      .flat()
      .map((j) => (j ? parseInt(j) : null));

    v.reverse();

    return v;
  });

  $effect(() => {
    const timer = setInterval(() => {
      const increment = randInt(stepMin, stepMax);
      const newValue = currentValue + increment;

      currentValue = clamp(newValue, min, max);
    }, interval);

    return () => {
      clearInterval(timer);
    };
  });
</script>

<div class={cx('counter', className)} {style}>
  {#each values as value}
    {#if typeof value === 'number'}
      {@render children({
        type: 'item',
        value,
      })}
    {:else}
      {@render children({
        type: 'separator',
      })}
    {/if}
  {/each}
</div>

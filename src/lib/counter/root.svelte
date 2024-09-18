<script lang="ts" module>
  import type { Snippet } from 'svelte';

  type Step = number | [min: number, max: number] | { min: number; max: number };

  type Context =
    | {
        type: 'item';
        value: number;
      }
    | {
        type: 'separator';
        value?: never;
      };

  export interface CounterProps {
    /**
     * @default 1000000
     */
    min?: number;
    /**
     * @default 9999999
     */
    max?: number;
    /**
     * @default
     * [50, 100]
     */
    step?: Step;
    /**
     * @default 1500
     */
    interval?: number;
    /**
     * @default 'ease-in-out'
     */
    easing?: string;
    /**
     * Set initial value of instead of random
     */
    initialValue?: number;
    children: Snippet<[Context]>;
    class?: string;
    style?: string;
  }
</script>

<script lang="ts">
  import { clamp } from '../clamp.js';
  import { randInt } from '../rand-int.js';

  let { style, children, ...props }: CounterProps = $props();

  let config = $derived({
    get min() {
      return props.min ?? 1000000;
    },
    get max() {
      return props.max ?? 9999999;
    },
    get step() {
      if (!props.step) {
        return {
          min: 50,
          max: 1000,
        };
      }

      if (typeof props.step === 'number') {
        return {
          min: props.step,
          max: props.step,
        };
      }

      if (Array.isArray(props.step)) {
        return {
          min: props.step[0],
          max: props.step[1],
        };
      }

      return {
        min: props.step.min,
        max: props.step.max,
      };
    },
    get interval() {
      return props.interval ?? 1500;
    },
    get initialValue() {
      return props.initialValue ?? null;
    },
    get easing() {
      return props.easing ?? 'ease-in-out';
    },
  });

  let interval = $derived(props.interval ?? 1500);
  let currentValue = $state(0);

  let values = $derived.by(() => {
    let d = config.max.toString().length;
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

  $effect.pre(() => {
    currentValue = config.initialValue
      ? clamp(config.initialValue, config.min, config.max)
      : randInt(config.min, config.max);
  });

  $effect(() => {
    const timer = setInterval(() => {
      const increment = randInt(config.step.min, config.step.max);
      const newValue = currentValue + increment;

      currentValue = clamp(newValue, config.min, config.max);
    }, interval);

    return () => {
      clearInterval(timer);
    };
  });
</script>

<!--
  @component

  @example
  ```svelte
  <Counter.Root>
    {#snippet children(o)}
      {#if o.type === 'item'}
        <Counter.Item value={o.value} />
      {:else}
        <Counter.Separator />
      {/if}
    {/snippet}
  </Counter.Root>
  ```
-->

<div
  style="--duration:{config.interval / 2000}s;--easing:{config.easing};{style}"
  data-scope="counter"
  data-part="item"
  {...props}
>
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

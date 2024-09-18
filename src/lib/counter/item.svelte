<script lang="ts" module>
  export interface CounterItemProps {
    value: number;
    class?: string;
    style?: string;
  }
</script>

<script lang="ts">
  import { clamp } from '../clamp.js';

  let { style, ...props }: CounterItemProps = $props();

  let value = $state(10);
  let content = '01234567890'.split('').join('\n\n');

  $effect(() => {
    value = clamp(props.value, 0, 9);
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

<span style="--value:{value};{style}" data-scope="counter" data-part="item" {...props}>
  <span>
    <span>{content}</span>
  </span>
</span>

<style>
  [data-scope='counter'][data-part='item'] {
    display: inline-flex;
    line-height: 1;
    align-items: center;
    justify-content: center;
  }

  [data-scope='counter'][data-part='item'] > span {
    height: 1em;
    display: block;
    overflow-y: hidden;
  }

  [data-scope='counter'][data-part='item'] > span > span {
    top: calc(var(--value) * -200%);
    display: block;
    position: relative;
    white-space: pre;
    transition-property: top;
    transition-duration: var(--duration, 1500);
    transition-timing-function: var(--easing, ease-in-out);
  }
</style>

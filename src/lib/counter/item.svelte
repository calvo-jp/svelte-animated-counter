<script lang="ts">
  import { clamp } from '../clamp.js';
  import { cx } from '../cx.js';

  interface Props {
    value: number;
    class?: string;
    style?: string;
  }

  let { value, style, class: className }: Props = $props();

  let internalValue = $state(10);

  $effect(() => {
    internalValue = clamp(value, 0, 9);
  });
</script>

<span class={cx('item', className)} {style}>
  <span style="--value: {internalValue};">
    <span>{'01234567890'.split('').join('\n\n')}</span>
  </span>
</span>

<style>
  .item {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 1rem;
    line-height: 1;
  }

  .item > span {
    height: 1em;
    display: inline-block;
    overflow-y: hidden;
  }

  .item > span > span {
    top: calc(var(--value) * -200%);
    display: inline-block;
    position: relative;
    white-space: pre;
    transition: top 1s ease-in-out;
  }
</style>

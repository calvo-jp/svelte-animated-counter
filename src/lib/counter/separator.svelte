<script lang="ts">
  import type { SvelteHTMLElements } from 'svelte/elements';
  import { cx } from '../cx.js';

  let { class: className, children, ...props }: SvelteHTMLElements['span'] = $props();
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

<span class={cx('separator', className)} {...props}>
  {#if children}
    {@render children()}
  {:else}
    ,
  {/if}
</span>

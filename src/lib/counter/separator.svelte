<script lang="ts" module>
  import type { SvelteHTMLElements } from 'svelte/elements';

  type BaseProps = SvelteHTMLElements['span'];

  export interface CounterSeparatorProps extends BaseProps {}
</script>

<script lang="ts">
  let { children, ...props }: CounterSeparatorProps = $props();
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

<span data-scope="counter" data-part="separator" {...props}>
  {#if children}
    {@render children()}
  {:else}
    ,
  {/if}
</span>

<script lang="ts">
  import { cx } from '$lib/cx.js';
  import type { SvelteHTMLElements } from 'svelte/elements';

  let {
    class: className,
    children,
    ...props
  }: SvelteHTMLElements['div'] = $props();
</script>

<div class={cx('', className)} {...props}>
  {#if children}
    {@render children()}
  {/if}
</div>

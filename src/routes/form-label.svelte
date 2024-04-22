<script lang="ts">
  import { cx } from '$lib/cx.js';
  import type { SvelteHTMLElements } from 'svelte/elements';

  let { class: className, children, ...props }: SvelteHTMLElements['label'] = $props();
</script>

<label for="" class={cx('mb-1 text-xs text-gray-500 block', className)} {...props}>
  {#if children}
    {@render children()}
  {/if}
</label>

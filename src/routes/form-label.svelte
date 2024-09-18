<script lang="ts">
  import type { SvelteHTMLElements } from 'svelte/elements';
  import { cx } from './utils.js';

  let { class: className, children, ...props }: SvelteHTMLElements['label'] = $props();
</script>

<label for="" class={cx('mb-1 text-xs text-gray-500 block', className)} {...props}>
  {#if children}
    {@render children()}
  {/if}
</label>

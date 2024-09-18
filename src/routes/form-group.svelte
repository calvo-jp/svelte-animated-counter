<script lang="ts">
  import type { SvelteHTMLElements } from 'svelte/elements';
  import { cx } from './utils.js';

  let { class: className, children, ...props }: SvelteHTMLElements['div'] = $props();
</script>

<div class={cx('', className)} {...props}>
  {#if children}
    {@render children()}
  {/if}
</div>

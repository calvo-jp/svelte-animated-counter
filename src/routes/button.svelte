<script lang="ts">
  import { cx } from '$lib/cx.js';
  import type { SvelteHTMLElements } from 'svelte/elements';

  let { class: className, children, ...props }: SvelteHTMLElements['button'] = $props();
</script>

<button
  type="button"
  class={cx(
    'h-10 block rounded w-full bg-gray-900 text-white font-medium text-sm transition-all duration-200 outline-none',
    'focus-visible:bg-gray-800',
    'active:scale-95',
    className,
  )}
  {...props}
>
  {#if children}
    {@render children()}
  {/if}
</button>

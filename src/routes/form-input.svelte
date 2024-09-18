<script lang="ts">
  import type { SvelteHTMLElements } from 'svelte/elements';
  import { cx } from './utils.js';

  let { class: className, ...props }: SvelteHTMLElements['input'] = $props();
</script>

<input
  type="text"
  class={cx(
    'border border-gray-200 block w-full h-10 px-3 outline-none rounded',
    'hover:border-gray-300',
    'focus:border-gray-800 focus:outline-1 focus:outline-gray-800 focus:outline-offset-0',
    className,
  )}
  {...props}
/>

<script lang="ts">
  import type { SvelteHTMLElements } from 'svelte/elements';
  import { cx } from '../cx.js';

  type Props = SvelteHTMLElements['span'];

  let { class: className, children, ...props }: Props = $props();
</script>

<span class={cx('separator', className)} {...props}>
  {#if children}
    {@render children()}
  {/if}
</span>

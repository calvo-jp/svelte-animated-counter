<script lang="ts">
  import { Counter } from '$lib/index.js';
</script>

<svelte:head>
  <title>Svelte Animated Counter</title>
</svelte:head>

<div class="p-5">
  <Counter.Root class="flex gap-1">
    {#snippet children(o)}
      {#if o.type === 'item'}
        <Counter.Item
          value={o.value}
          class="size-10 text-xl cursor-pointer font-bold border border-gray-300 rounded-sm"
        />
      {:else}
        <Counter.Separator class="h-10 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="w-5 h-5"
          >
            <path
              fill="currentColor"
              d="M14.62 12.023a4 4 0 1 1 1.354-3.484c.356 1.81.352 3.967-.464 5.9c-.862 2.04-2.601 3.76-5.57 4.537a.75.75 0 1 1-.38-1.451c2.531-.663 3.892-2.07 4.568-3.67a7.2 7.2 0 0 0 .492-1.832"
            />
          </svg>
        </Counter.Separator>
      {/if}
    {/snippet}
  </Counter.Root>
</div>

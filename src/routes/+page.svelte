<script lang="ts">
  import { Counter } from '$lib';
</script>

<svelte:head>
  <title>Animated Counter</title>
</svelte:head>

<Counter.Root style="display:flex;gap:0.25rem;">
  {#snippet children(o)}
    {#if o.type === 'item'}
      <Counter.Item
        value={o.value}
        style="width:2rem;height:2rem;background:black;color:white;border-radius:0.25em;font-weight:bold;"
      />
    {:else}
      <Counter.Separator style="font-weight:bold;">,</Counter.Separator>
    {/if}
  {/snippet}
</Counter.Root>

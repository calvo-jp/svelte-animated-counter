# Svelte Animated Counter

A simple animated counter component for Svelte 5.

## Installation

```bash
npm install svelte-animated-counter
```

## Usage

```svelte
<Counter.Root>
  {#snippet children(o)}
    {#if o.type === 'item'}
      <Counter.Item value={o.value} />
    {:else}
      <Counter.Separator>,</Counter.Separator>
    {/if}
  {/snippet}
</Counter.Root>
```

View demo [here](https://svelte-animated-counter-demo.vercel.app/)

<script lang="ts">
	import { Counter } from '$lib';
</script>

<Counter.Root style="display:flex;gap:0.25rem">
	{#snippet children(item)}
		<Counter.Item
			{item}
			style="width:2rem;height:2rem;background:black;color:white;border-radius:0.25em;font-weight:bold;"
		/>
	{/snippet}
</Counter.Root>

<Counter.Root style="margin-top:1rem;">
	{#snippet children(item)}
		<Counter.Item {item} />
	{/snippet}
</Counter.Root>

<style>
	:global(body) {
		font-family:
			'Inter',
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			Oxygen,
			Ubuntu,
			Cantarell,
			'Open Sans',
			'Helvetica Neue',
			sans-serif;
	}
</style>

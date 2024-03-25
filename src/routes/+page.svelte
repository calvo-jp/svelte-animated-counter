<script lang="ts">
	import { Counter } from '$lib';
</script>

<Counter.Root style="display:flex;gap:0.25rem">
	{#snippet children(item)}
		<Counter.Item
			{item}
			style="width:2rem;height:2rem;background:black;color:white;border-radius:0.5em;font-weight:bold;"
		/>
	{/snippet}
</Counter.Root>

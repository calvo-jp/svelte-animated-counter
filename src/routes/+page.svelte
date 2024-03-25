<script lang="ts">
	import { Counter } from '$lib';
</script>

<Counter.Root>
	{#snippet children(item)}
		<Counter.Item {item} />
	{/snippet}
</Counter.Root>

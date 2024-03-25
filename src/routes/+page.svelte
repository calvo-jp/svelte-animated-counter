<script lang="ts">
	import { Counter } from '$lib';
</script>

<Counter.Root class="root">
	{#snippet children(item)}
		<Counter.Item {item} class="item" />
	{/snippet}
</Counter.Root>

<style>
	:global(.root) {
		display: flex;
		gap: 0.15rem;
	}

	:global(.item) {
		color: white;
		background-color: black;
		font-weight: bold;
		width: 1rem;
		height: 1rem;
		padding: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 0.15em;
	}
</style>

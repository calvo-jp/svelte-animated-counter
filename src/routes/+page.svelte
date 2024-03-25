<script lang="ts">
	import { Counter } from '$lib';
</script>

<Counter.Root class="root">
	{#snippet children(item)}
		<Counter.Item {item} class="item" />
	{/snippet}
</Counter.Root>

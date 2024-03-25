<script lang="ts">
	import type { Item } from './types';
	import { clamp } from './utils';

	interface CounterItemProps {
		item: Item;
		class?: string;
		style?: string;
	}

	let { item, ...props }: CounterItemProps = $props();

	let value = $derived(clamp(item.value, 0, 9));
</script>

<div {...props}>
	<span style="top: calc({value} * -100%);"> {'0123456789'.split('').join('\n')}</span>
</div>

<style>
	div {
		width: fit-content;
		height: 1em;
		display: inline-block;
		overflow-y: hidden;
		line-height: 1;
	}

	div > span {
		width: 100%;
		height: 100%;
		position: relative;
		text-align: center;
		white-space: pre;
		transition: all 1s cubic-bezier(1, 0, 0, 1);
		display: inline-block;
	}
</style>

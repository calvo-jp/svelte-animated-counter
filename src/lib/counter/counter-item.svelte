<script lang="ts">
	import type { Item } from './types';
	import { clamp, cx } from './utils';

	interface CounterItemProps {
		item: Item;
		class?: string;
		style?: string;
	}

	let { item, style, class: className }: CounterItemProps = $props();

	let value = $derived(clamp(item.value, 0, 9));
</script>

<span class={cx('counter item', className)} {style}>
	<span style="--value: {value};">
		<span>{'0123456789'.split('').join('\n')}</span>
	</span>
</span>

<style>
	.counter.item {
		position: relative;
		display: inline-block;
		height: 1em;
		line-height: 1;
	}

	.counter.item > div {
		width: 100%;
		height: 100%;
		overflow-y: hidden;
		display: inline-block;
	}

	.counter.item > div > div {
		top: calc(var(--value) * -100%);
		width: 100%;
		height: 100%;
		position: relative;
		text-align: center;
		white-space: pre;
		transition: all 1s cubic-bezier(1, 0, 0, 1);
	}
</style>

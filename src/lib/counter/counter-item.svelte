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

<div class={cx('counter item', className)} {style}>
	<div style="--value: {value};">
		<div>{'0123456789'.split('').join('\n')}</div>
	</div>
</div>

<style>
	.counter.item {
		position: relative;
		line-height: 1;
	}

	.counter.item > div {
		width: 100%;
		height: 100%;
		overflow-y: hidden;
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

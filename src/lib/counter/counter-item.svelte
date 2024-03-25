<script lang="ts">
	import type { Item } from './types';
	import { clamp, cx } from './utils';

	interface CounterItemProps {
		item: Item;
		class?: string;
		style?: string;
	}

	let { item, class: className, ...props }: CounterItemProps = $props();

	let value = $derived(clamp(item.value, 0, 9));
</script>

<div class={cx('counter item', className)} {...props}>
	<div style="--value: {value};">
		<div>{'0123456789'.split('').join('\n')}</div>
	</div>
</div>

<style>
	.counter.item {
		display: inline-block;
		height: 1em;
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
		transition: all 1s ease-in-out;
	}
</style>

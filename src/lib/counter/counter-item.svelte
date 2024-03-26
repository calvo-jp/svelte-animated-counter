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
		<div>{'0123456789'.split('').join('\n\n')}</div>
	</div>
</div>

<style>
	.counter.item {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		height: 1rem;
		line-height: 1;
	}

	.counter.item > div {
		height: 1em;
		overflow-y: hidden;
	}

	.counter.item > div > div {
		top: calc(var(--value) * -200%);
		position: relative;
		white-space: pre;
		transition: top 1s ease-in-out;
	}
</style>

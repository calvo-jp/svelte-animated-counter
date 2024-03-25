<script lang="ts">
	import type { Item } from './types';
	import { clamp, cx } from './utils';

	interface CounterItemProps {
		item: Item;
		class?: string;
		style?: string;
	}

	let { item, ...props }: CounterItemProps = $props();

	let index = $derived(clamp(item.value, 0, 9));
</script>

<div class={cx('counter--item', props.class)} style={props.style}>
	<div style="--index: {index};">
		<div>{'0123456789'.split('').join('\n')}</div>
	</div>
</div>

<style>
	.counter--item {
		position: relative;
		line-height: 1;
	}

	.counter--item > div {
		width: 100%;
		height: 100%;
		overflow-y: hidden;
	}

	.counter--item > div > div {
		top: calc(var(--index) * -1em);
		width: 100%;
		height: 100%;
		position: relative;
		text-align: center;
		white-space: pre;
		transition: all 1s cubic-bezier(1, 0, 0, 1);
	}
</style>

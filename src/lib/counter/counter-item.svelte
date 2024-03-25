<script lang="ts">
	import type { Item } from './types';
	import { clamp, cx } from './utils';

	interface CounterItemProps {
		item: Item;
		class?: string;
	}

	let { item, ...props }: CounterItemProps = $props();

	let index = $derived(clamp(item.value, 0, 9));
</script>

<div class={cx('counter', props.class)}>
	<div style="--index: {index};">
		<div>{'0123456789'.split('').join('\n')}</div>
	</div>
</div>

<style>
	.counter {
		position: relative;
		display: inline-block;
		line-height: 1em;
		height: 1em;
	}

	.counter > div {
		height: 1em;
		display: inline-block;
		overflow-y: hidden;
	}

	.counter > div > div {
		top: calc(var(--index) * -1em);
		height: 100%;
		position: relative;
		text-align: center;
		white-space: pre;
		transition: all 1s cubic-bezier(1, 0, 0, 1);
	}
</style>

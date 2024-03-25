<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Item } from './types';
	import { clamp, randInt } from './utils';

	interface CounterRootProps {
		/**
		 * @default
		 * 1000000
		 */
		min?: number;
		/**
		 * @default
		 * 9999999
		 */
		max?: number;
		/**
		 * @default
		 * [50, 100]
		 */
		step?: number | [min: number, max: number];
		/**
		 * @default
		 * 1000
		 */
		interval?: number;
		children: Snippet<[Item]>;
	}

	let {
		min = 1000000,
		max = 9999999,
		step = [50, 100],
		interval = 1000,
		children
	}: CounterRootProps = $props();

	let stepMin = $derived(Array.isArray(step) ? step[0] : step);
	let stepMax = $derived(Array.isArray(step) ? step[1] : step);

	let value = $state(min);
	let items = $derived.by<Item[]>(() => {
		return value
			.toString()
			.split('')
			.map((value) => ({
				value: Number(value)
			}));
	});

	$effect(() => {
		const timer = setInterval(() => {
			const increment = randInt(stepMin, stepMax);
			const newValue = value + increment;

			value = clamp(newValue, min, max);
		}, interval);

		return () => clearInterval(timer);
	});
</script>

{#each items as item}
	{@render children(item)}
{/each}

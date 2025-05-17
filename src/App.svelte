<script lang="ts">
	import Visualizer from "./lib/visualizer.svelte";

	import type { ArrayItem } from "./lib/types";
	import { bubbleSort } from "./lib/bubble_sort";
	import { combSort } from "./lib/comb_sort";
	import { mergeSort } from "./lib/merge_sort";
	import { quickSort } from "./lib/quick_sort";

	let array_bubble_sort: ArrayItem[] = $state([]);
	let array_comb_sort: ArrayItem[] = $state([]);
	let array_merge_sort: ArrayItem[] = $state([]);
	let array_quick_sort: ArrayItem[] = $state([]);

	let delay = $state(10);
	let size = $state(80);
	let width = $state(0);

	// Generate random array
	function generateArray() {
		let array = [];
		for (let i = 0; i < size; i++) {
			array.push({
				value: Math.floor(Math.random() * 100) + 1,
				color: ''
			});
		}
		array_bubble_sort = [...array];
		array_comb_sort = [...array];
		array_merge_sort = [...array];
		array_quick_sort = [...array];
	}

	// redraw the component
	async function redraw() {
		await new Promise(resolve => setTimeout(resolve, delay));
	}

	// Initialize array
	generateArray();
</script>

<main>
	<div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 20px;">
		<label for="delay">Delay (ms): {delay}</label>
		<input type="range" id="delay" bind:value={delay} min="0" max="100" step="1">

		<label for="size">Size: {size}</label>
		<input type="range" id="size" bind:value={size} min="10" max="1000" step="10" onchange={generateArray}>
	</div>

	<button onclick={() => {
		generateArray();
		bubbleSort(array_bubble_sort, redraw);
		combSort(array_comb_sort, redraw);
		mergeSort(array_merge_sort, redraw);
		quickSort(array_quick_sort, redraw);
	}}>Start Sort</button>

	<Visualizer name="Bubble Sort" width={width} size={size} array={array_bubble_sort} />
	<Visualizer name="Comb Sort" width={width} size={size} array={array_comb_sort} />
	<Visualizer name="Merge Sort" width={width} size={size} array={array_merge_sort} />
	<Visualizer name="Quick Sort" width={width} size={size} array={array_quick_sort} />
</main>

<style>
	main {
		padding: 1em;
		text-align: center;
	}

	button {
		margin: 10px;
		padding: 10px 20px;
		font-size: 16px;
	}

	div[style] {
		transition: height 0.3s, background-color 0.3s;
	}
</style>

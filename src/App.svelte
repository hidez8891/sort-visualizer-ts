<script lang="ts">
	import Visualizer from "./lib/visualizer.svelte";

	import type { ArrayItem } from "./lib/types";
	import { insertionSort } from "./lib/insertion_sort";
	import { selectionSort } from "./lib/selection_sort";
	import { bubbleSort } from "./lib/bubble_sort";
	import { bitonicSort } from "./lib/bitonic_sort";
	import { combSort } from "./lib/comb_sort";
	import { mergeSort } from "./lib/merge_sort";
	import { quickSort } from "./lib/quick_sort";

	let array_insertion_sort: ArrayItem[] = $state([]);
	let array_selection_sort: ArrayItem[] = $state([]);
	let array_bubble_sort: ArrayItem[] = $state([]);
	let array_bitonic_sort: ArrayItem[] = $state([]);
	let array_comb_sort: ArrayItem[] = $state([]);
	let array_merge_sort: ArrayItem[] = $state([]);
	let array_quick_sort: ArrayItem[] = $state([]);

	let delay = $state(10);
	let expo = $state(4);
	let size = $derived(Math.pow(2, expo));
	let row = $state(1);

	// Generate random array
	function generateArray() {
		let array = [];
		for (let i = 0; i < size; i++) {
			array.push({
				value: Math.floor(Math.random() * 100) + 1,
				color: ''
			});
		}

		array_insertion_sort = [...array];
		array_selection_sort = [...array];
		array_bubble_sort = [...array];
		array_bitonic_sort = [...array];
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
	<div id="header">
		<label for="delay">Delay (ms): {delay}</label>
		<input type="range" id="delay" bind:value={delay} min="0" max="100" step="1">

		<label for="expo">Size: {size}</label>
		<input type="range" id="expo" bind:value={expo} min="4" max="10" step="1" onchange={generateArray}>

		<label for="row">Row: {row}</label>
		<input type="range" id="row" bind:value={row} min="1" max="5" step="1">
	</div>

	<button onclick={async () => {
		await Promise.all([
			insertionSort(array_insertion_sort, redraw),
			selectionSort(array_selection_sort, redraw),
			bubbleSort(array_bubble_sort, redraw),
			bitonicSort(array_bitonic_sort, redraw),
			combSort(array_comb_sort, redraw),
			mergeSort(array_merge_sort, redraw),
			quickSort(array_quick_sort, redraw),
		]);
	}}>Start Sort</button>

	<div id="grid-items" style="grid-template-columns: repeat({row}, 1fr);">
		<Visualizer name="Insertion Sort" size={size} array={array_insertion_sort} />
		<Visualizer name="Selection Sort" size={size} array={array_selection_sort} />
		<Visualizer name="Bubble Sort" size={size} array={array_bubble_sort} />
		<Visualizer name="Bitonic Sort" size={size} array={array_bitonic_sort} />
		<Visualizer name="Comb Sort" size={size} array={array_comb_sort} />
		<Visualizer name="Merge Sort" size={size} array={array_merge_sort} />
		<Visualizer name="Quick Sort" size={size} array={array_quick_sort} />
	</div>
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

	#header {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 20px;
	}

	#grid-items {
		display: grid;
		/* grid-template-columns: repeat(auto-fill, 100%); */
		gap: 20px;
		margin-top: 20px;
		margin: 20px 20px;
		place-content: center;
	}
</style>


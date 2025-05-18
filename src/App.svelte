<script lang="ts">
	import Visualizer from "./lib/visualizer.svelte";

	import {
		type ArrayItem,
		type RunningOption,
		type SortingAlgorithm,
		AbortSortingError
	} from './lib/types';

	import { InsertionSort } from "./lib/insertion_sort";
	import { SelectionSort } from "./lib/selection_sort";
	import { BubbleSort } from "./lib/bubble_sort";
	import { BitonicSort } from "./lib/bitonic_sort";
	import { CombSort } from "./lib/comb_sort";
	import { ShellSort } from "./lib/shell_sort";
	import { HeapSort } from "./lib/heap_sort";
	import { MergeSort } from "./lib/merge_sort";
	import { QuickSort } from "./lib/quick_sort";

	let algorithms: Array<{
		sorter: SortingAlgorithm,
		array: ArrayItem[],
	}> = $state([
		{sorter: new InsertionSort(), array: []},
		{sorter: new SelectionSort(), array: []},
		{sorter: new BubbleSort(), array: []},
		{sorter: new BitonicSort(), array: []},
		{sorter: new CombSort(), array: []},
		{sorter: new ShellSort(), array: []},
		{sorter: new HeapSort(), array: []},
		{sorter: new MergeSort(), array: []},
		{sorter: new QuickSort(), array: []},
	]);

	let delay = $state(10);
	let expo = $state(4);
	let row = $state(3);

	let size = $derived(Math.pow(2, expo));
	let sorting = $state(false);

	function generateArray() {
		let array = [];
		for (let i = 0; i < size; i++) {
			array.push({
				value: Math.floor(Math.random() * 100) + 1,
				color: ''
			});
		}

		for (let i = 0; i < algorithms.length; i++) {
			algorithms[i].array = [...array];
		}
	}

	// compare ArrayItem
    async function compare(a: ArrayItem, b: ArrayItem): Promise<number> {
		a.color = "orange";
		b.color = "orange";
		await new Promise(resolve => setTimeout(resolve, delay));
		a.color = "";
		b.color = "";

		return a.value - b.value;
	}

	// swap ArrayItem
    async function swap(array: ArrayItem[], i: number, j: number): Promise<void> {
		[array[i], array[j]] = [array[j], array[i]]
	}

	// copy src array to dst array
    async function copyWith(dst: ArrayItem[], dst_index: number, src: ArrayItem[], start_idx: number, end_idx: number): Promise<number> {
		for (let i = start_idx; i <= end_idx; i++) {
			dst[dst_index + i] = src[i];
		}
	}

	// finished sorting
	function finished(array: ArrayItem[]): ArrayItem[] {
		for (let i = 0; i < array.length; i++) {
			array[i].color = "green";
		}
		return array;
	}

	// Initialize array
	generateArray();
</script>

<main>
	<div id="header">
		<label for="delay">Delay (ms): {delay}</label>
		<input type="range" id="delay" bind:value={delay} min="0" max="500" step="10">

		<label for="expo">Size: {size}</label>
		<input type="range" id="expo" bind:value={expo} min="4" max="10" step="1" onchange={generateArray} disabled={sorting != false}>

		<label for="row">Row: {row}</label>
		<input type="range" id="row" bind:value={row} min="1" max="9" step="1">
	</div>

	<button onclick={ async () => {
		if (sorting) {
			sorting = false;
			return;
		} else {
			const opt: RunningOption = {
				isRunning: () => sorting,
				compare: compare,
				swap: swap,
				copyWith: copyWith,
			};

			sorting = true;
			Promise.all(algorithms.map(
				(algorithm) => algorithm.sorter.sort(algorithm.array, opt).then(finished)
			)).then(
				() => sorting = false
			);
		}
	}}>
	{#if sorting}
		Stop Sort
	{:else}
		Start Sort
	{/if}
	</button>

	<button onclick={ () => generateArray() } disabled={sorting != false}>
		Generate
	</button>

	<div id="grid-items" style="grid-template-columns: repeat({row}, 1fr);">
		{#each algorithms as algorithm}
			<Visualizer name={algorithm.sorter.name} size={size} array={algorithm.array} />
		{/each}
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

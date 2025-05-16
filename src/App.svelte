<script lang="ts">
	import { onMount, tick } from 'svelte';

 	const sleep = (time: number) => new Promise(resolve => {
		setTimeout(resolve, time);
	});

	type ArrayItem = {
		value: number;
		color: string;
	};

	let array_bubble_sort: ArrayItem[] = $state([]);
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
		array_merge_sort = [...array];
		array_quick_sort = [...array];
	}

	// Bubble sort algorithm
	async function bubbleSort(array: ArrayItem[]) {
		let n = array.length;

		for (let i = 0; i < n - 1; i++) {
			for (let j = 0; j < n - i - 1; j++) {
				// Highlight current elements
				array[j].color = 'orange';
				array[j + 1].color = 'orange';
				await sleep(delay)

				// Compare elements
				if (array[j].value > array[j + 1].value) {
					// Swap elements
					[array[j], array[j + 1]] = [array[j + 1], array[j]];
					await sleep(delay)
				}

				// Reset color
				array[j].color = '';
				array[j + 1].color = '';
			}
		}

		for (let i = 0; i < array.length; i++) {
			array[i].color = 'green'; // Highlight sorted elements
		}
	}

// Quick sort algorithm
async function quickSort(array: ArrayItem[]) {
	await sort(array, 0, array.length - 1);

	for (let i = 0; i < array.length; i++) {
		array[i].color = 'green'; // Highlight sorted elements
	}
}

async function sort(arr: ArrayItem[], left: number, right: number): Promise<void> {
	if (left >= right) return;

	// Choose pivot (middle element)
	const pivotIndex = Math.floor((left + right) / 2);
	const pivotValue = arr[pivotIndex].value;

	// Highlight pivot
	arr[pivotIndex].color = 'green';
	await sleep(delay);

	// Partition array
	let i = left, j = right;
	while (i <= j) {
		// Move left pointer
		while (i <= j && arr[i].value < pivotValue) {
			i++;
			await sleep(delay);
		}

		// Move right pointer
		while (i <= j && arr[j].value > pivotValue) {
			j--;
			await sleep(delay);
		}

		// Swap elements
		if (i <= j) {
			// Highlight elements to swap
			arr[i].color = 'orange';
			arr[j].color = 'orange';
			await sleep(delay);

			// Swap
			[arr[i], arr[j]] = [arr[j], arr[i]];
			await sleep(delay);

			// Reset colors
			arr[i].color = '';
			arr[j].color = '';
			await sleep(delay);

			i++;
			j--;
		}
	}

	// Recursively sort left and right partitions
	await sort(arr, left, j);
	await sort(arr, i, right);
}
	// Merge sort algorithm
	async function mergeSort(array: ArrayItem[]) {
		await merge(array, 0, array.length - 1);

		for (let i = 0; i < array.length; i++) {
			array[i].color = 'green'; // Highlight sorted elements
		}
	}

	async function merge(arr: ArrayItem[], left: number, right: number): Promise<void> {
		if (left >= right) return;

		const mid = Math.floor((left + right) / 2);
		await merge(arr, left, mid);
		await merge(arr, mid + 1, right);

		// Merge the two halves
		const merged: ArrayItem[] = [];
		let i = left, j = mid + 1;

		// Compare elements
		while (i <= mid && j <= right) {
			let pi = i, pj = j;

			// Highlight merge boundaries
			arr[pi].color = 'orange';
			arr[pj].color = 'orange';
			await sleep(delay);

			if (arr[i].value <= arr[j].value) {
				merged.push(arr[i]);
				i++;
			} else {
				merged.push(arr[j]);
				j++;
			}
			await sleep(delay);

			// Reset colors
			arr[pi].color = '';
			arr[pj].color = '';
		}

		// Add remaining elements
		while (i <= mid) {
			arr[i].color = 'orange';
			await sleep(delay);

			merged.push(arr[i]);
			i++;
			await sleep(delay);

			arr[i-1].color = '';
		}
		while (j <= right) {
			arr[j].color = 'orange';
			await sleep(delay);

			merged.push(arr[j]);
			j++;
			await sleep(delay);

			arr[j-1].color = '';
		}

		// Update array with merged results
		for (let k = 0; k < merged.length; k++) {
			arr[left + k] = merged[k];
		}
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
		bubbleSort(array_bubble_sort);
		mergeSort(array_merge_sort);
		quickSort(array_quick_sort);
	}}>Start Sort</button>
	<h1>Bubble Sort</h1>
	<div style="display: flex; gap: {(width / size) < 15 ? '0px' : '5px'}; margin-top: 20px;" bind:clientWidth={width}>
		{#each array_bubble_sort as item, index}
			<div
				style="flex: 1; background-color: {item.color || 'steelblue'}; height: {item.value * 3}px; transition: height 0.3s, background-color 0.3s;"
			></div>
		{/each}
	</div>
	<h1>Merge Sort</h1>
	<div style="display: flex; gap: {(width / size) < 15 ? '0px' : '5px'}; margin-top: 20px;">
		{#each array_merge_sort as item, index}
			<div
				style="flex: 1; background-color: {item.color || 'steelblue'}; height: {item.value * 3}px; transition: height 0.3s, background-color 0.3s;"
			></div>
		{/each}
	</div>
	<h1>Quick Sort</h1>
	<div style="display: flex; gap: {(width / size) < 15 ? '0px' : '5px'}; margin-top: 20px;">
		{#each array_quick_sort as item, index}
			<div
				style="flex: 1; background-color: {item.color || 'steelblue'}; height: {item.value * 3}px; transition: height 0.3s, background-color 0.3s;"
			></div>
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

	div[style] {
		transition: height 0.3s, background-color 0.3s;
	}
</style>

<script lang="ts">
	import { onMount, tick } from 'svelte';

 	const sleep = (time: number) => new Promise(resolve => setTimeout(resolve, time))

	type ArrayItem = {
		value: number;
		color: string;
	};

	let array_bubble_sort: ArrayItem[] = $state([]);
	let array_merge_sort: ArrayItem[] = $state([]);
	let array_quick_sort: ArrayItem[] = $state([]);

	let delay = 10;
	let size = 80;

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
				await tick();
				await sleep(delay)

				// Compare elements
				if (array[j].value > array[j + 1].value) {
					// Swap elements
					[array[j], array[j + 1]] = [array[j + 1], array[j]];
					await tick();
					await sleep(delay)
				}

				// Reset color
				array[j].color = '';
				array[j + 1].color = '';
				await tick();
			}
		}

		for (let i = 0; i < array.length; i++) {
			array[i].color = 'green'; // Highlight sorted elements
			await tick();
		}
	}

// Quick sort algorithm
async function quickSort(array: ArrayItem[]) {
	await sort(array, 0, array.length - 1);

	for (let i = 0; i < array.length; i++) {
		array[i].color = 'green'; // Highlight sorted elements
		await tick();
	}
}

async function sort(arr: ArrayItem[], left: number, right: number): Promise<void> {
	if (left >= right) return;

	// Choose pivot (middle element)
	const pivotIndex = Math.floor((left + right) / 2);
	const pivotValue = arr[pivotIndex].value;

	// Highlight pivot
	arr[pivotIndex].color = 'green';
	await tick();
	await sleep(delay);

	// Partition array
	let i = left, j = right;
	while (i <= j) {
		// Move left pointer
		while (i <= j && arr[i].value < pivotValue) {
			i++;
			await tick();
			await sleep(delay);
		}

		// Move right pointer
		while (i <= j && arr[j].value > pivotValue) {
			j--;
			await tick();
			await sleep(delay);
		}

		// Swap elements
		if (i <= j) {
			// Highlight elements to swap
			arr[i].color = 'orange';
			arr[j].color = 'orange';
			await tick();
			await sleep(delay);

			// Swap
			[arr[i], arr[j]] = [arr[j], arr[i]];
			await tick();
			await sleep(delay);

			// Reset colors
			arr[i].color = '';
			arr[j].color = '';
			await tick();
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
			await tick();
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
			await tick();
			await sleep(delay);

			if (arr[i].value <= arr[j].value) {
				merged.push(arr[i]);
				i++;
			} else {
				merged.push(arr[j]);
				j++;
			}
			await tick();
			await sleep(delay);

			// Reset colors
			arr[pi].color = '';
			arr[pj].color = '';
			await tick();
		}

		// Add remaining elements
		while (i <= mid) {
			arr[i].color = 'orange';
			await tick();
			await sleep(delay);

			merged.push(arr[i]);
			i++;
			await tick();
			await sleep(delay);

			arr[i-1].color = '';
			await tick();
		}
		while (j <= right) {
			arr[j].color = 'orange';
			await tick();
			await sleep(delay);

			merged.push(arr[j]);
			j++;
			await tick();
			await sleep(delay);

			arr[j-1].color = '';
			await tick();
		}

		// Update array with merged results
		for (let k = 0; k < merged.length; k++) {
			arr[left + k] = merged[k];
		}
		await tick();
	}

	// Initialize array
	generateArray();
</script>

<main>
	<button onclick={() => {
		generateArray();
		bubbleSort(array_bubble_sort);
		mergeSort(array_merge_sort);
		quickSort(array_quick_sort);
	}}>Start Sort</button>
	<h1>Bubble Sort</h1>
	<div style="display: flex; gap: 5px; margin-top: 20px;">
		{#each array_bubble_sort as item, index}
			<div
				style="flex: 1; background-color: {item.color || 'steelblue'}; height: {item.value * 3}px; transition: height 0.3s, background-color 0.3s;"
			></div>
		{/each}
	</div>
	<h1>Merge Sort</h1>
	<div style="display: flex; gap: 5px; margin-top: 20px;">
		{#each array_merge_sort as item, index}
			<div
				style="flex: 1; background-color: {item.color || 'steelblue'}; height: {item.value * 3}px; transition: height 0.3s, background-color 0.3s;"
			></div>
		{/each}
	</div>
	<h1>Quick Sort</h1>
	<div style="display: flex; gap: 5px; margin-top: 20px;">
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

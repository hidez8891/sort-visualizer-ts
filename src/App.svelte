<script lang="ts">
	import { onMount, tick } from 'svelte';

 	const sleep = (time: number) => new Promise(resolve => setTimeout(resolve, time))

	type ArrayItem = {
		value: number;
		color: string;
	};

	let array: ArrayItem[] = $state([]);
	let isSorting = $state(false);
	let delay = 50;

	// Generate random array
	function generateArray() {
		array = [];
		for (let i = 0; i < 80; i++) {
			array.push({
				value: Math.floor(Math.random() * 100) + 1,
				color: ''
			});
		}
	}

	// Bubble sort algorithm
	async function bubbleSort() {
		isSorting = true;
		let n = array.length;

		// Add a check to stop sorting if cancelled
		if (!isSorting) return;

		for (let i = 0; i < n - 1; i++) {
			// Add a check to stop sorting if cancelled
			if (!isSorting) return;

			for (let j = 0; j < n - i - 1; j++) {
				// Add a check to stop sorting if cancelled
				if (!isSorting) return;

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
		isSorting = false;
	}

	// Merge sort algorithm
	async function mergeSort() {
		isSorting = true;
		await merge(array, 0, array.length - 1);
		isSorting = false;
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
	<h1>Bubble Sort Visualization</h1>
	<button onclick={generateArray}>Generate New Array</button>
	<button onclick={bubbleSort} disabled={isSorting}>Start Bubble Sort</button>
	<button onclick={mergeSort} disabled={isSorting}>Start Merge Sort</button>
	<div style="display: flex; gap: 5px; margin-top: 20px;">
		{#each array as item, index}
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

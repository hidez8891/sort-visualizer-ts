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
		for (let i = 0; i < 10; i++) {
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

	// Initialize array
	generateArray();
</script>

<main>
	<h1>Bubble Sort Visualization</h1>
	<button onclick={generateArray}>Generate New Array</button>
	<button onclick={bubbleSort} disabled={isSorting}>Start Sorting</button>
	<div style="display: flex; gap: 10px; margin-top: 20px;">
		{#each array as item, index}
			<div
				style="flex: 1; background-color: {item.color || 'steelblue'}; height: {item.value * 3}px; transition: height 0.3s, background-color 0.3s;"
			></div>
		{/each}
	</div>
</main>

<style>
	main {
		padding: 2em;
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

import type { ArrayItem } from './types';

// Quick sort algorithm
export async function quickSort(array: ArrayItem[], requireDraw: () => Promise<void>) {
	await sort(array, 0, array.length - 1, requireDraw);

	for (let i = 0; i < array.length; i++) {
		array[i].color = 'green'; // Highlight sorted elements
	}
    await requireDraw();
}

async function sort(arr: ArrayItem[], left: number, right: number, requireDraw: () => Promise<void>): Promise<void> {
	if (left >= right) return;

	// Choose pivot (middle element)
	const pivotIndex = Math.floor((left + right) / 2);
	const pivotValue = arr[pivotIndex].value;

	// Highlight pivot
	arr[pivotIndex].color = 'green';

	// Partition array
	let i = left, j = right;
	while (i <= j) {
		// Move left pointer
		while (i <= j && arr[i].value < pivotValue) {
			arr[i].color = 'orange';
            await requireDraw();
			arr[i].color = '';

			i++;
		}

		// Move right pointer
		while (i <= j && arr[j].value > pivotValue) {
			arr[j].color = 'orange';
            await requireDraw();
			arr[j].color = '';

			j--;
		}

		// Swap elements
		if (i <= j) {
			// Highlight elements to swap
			arr[i].color = 'orange';
			arr[j].color = 'orange';
            await requireDraw();
			arr[i].color = '';
			arr[j].color = '';

			// Swap
			[arr[i], arr[j]] = [arr[j], arr[i]];

			i++;
			j--;
		}
	}

	// Highlight OFF pivot
	arr[pivotIndex].color = '';

	// Recursively sort left and right partitions
	await sort(arr, left, j, requireDraw);
	await sort(arr, i, right, requireDraw);
}

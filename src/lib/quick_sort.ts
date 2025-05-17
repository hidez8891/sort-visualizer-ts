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
    await requireDraw();

	// Partition array
	let i = left, j = right;
	while (i <= j) {
		// Move left pointer
		while (i <= j && arr[i].value < pivotValue) {
			i++;
            await requireDraw();
		}

		// Move right pointer
		while (i <= j && arr[j].value > pivotValue) {
			j--;
            await requireDraw();
		}

		// Swap elements
		if (i <= j) {
			// Highlight elements to swap
			arr[i].color = 'orange';
			arr[j].color = 'orange';
            await requireDraw();

			// Swap
			[arr[i], arr[j]] = [arr[j], arr[i]];
            await requireDraw();

			// Reset colors
			arr[i].color = '';
			arr[j].color = '';
            await requireDraw();

			i++;
			j--;
		}
	}

	// Recursively sort left and right partitions
	await sort(arr, left, j, requireDraw);
	await sort(arr, i, right, requireDraw);
}

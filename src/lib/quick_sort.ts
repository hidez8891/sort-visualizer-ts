import {
	type ArrayItem,
	type RunningOption,
	type SortingAlgorithm,
	AbortSortingError
} from './types';

export class QuickSort implements SortingAlgorithm {
	name = 'Quick Sort';

	async sort(array: ArrayItem[], opt: RunningOption): Promise<ArrayItem[]> {
		await this.quickSort(array, 0, array.length - 1, opt);
		return array;
	}

	async quickSort(array: ArrayItem[], left: number, right: number, opt: RunningOption): Promise<void> {
		const { isRunning, compare, swap } = opt;

		if (left >= right)
			return;

		// Choose pivot (middle element)
		const pivotIndex = Math.floor((left + right) / 2);
		const pivotValue = array[pivotIndex];

		// Partition array
		let i = left, j = right;
		while (i <= j) {
			if (!isRunning())
				throw new AbortSortingError();

			// Move left pointer
			while (i <= j && await compare(array[i], pivotValue) < 0) {
				if (!isRunning())
					throw new AbortSortingError();
				i++;
			}

			// Move right pointer
			while (i <= j && await compare(array[j], pivotValue) > 0) {
				if (!isRunning())
					throw new AbortSortingError();
				j--;
			}

			// Swap elements
			if (i <= j) {
				await swap(array, i, j);
				i++;
				j--;
			}
		}

		// Recursively sort left and right partitions
		await this.quickSort(array, left, j, opt);
		await this.quickSort(array, i, right, opt);
	}
}

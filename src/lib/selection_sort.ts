import {
    type ArrayItem,
    type RunningOption,
    type SortingAlgorithm,
    AbortSortingError
} from './types';

export class SelectionSort implements SortingAlgorithm {
    name = 'Selection Sort';

    async sort(array: ArrayItem[], opt: RunningOption): Promise<ArrayItem[]> {
        const { isRunning, compare, swap } = opt;
        const n = array.length;

        for (let i = 0; i < n - 1; i++) {
            if (!isRunning())
                throw new AbortSortingError();

            // Find the minimum element in remaining unsorted array
            let minIndex = i;
            for (let j = i + 1; j < n; j++) {
                if (!isRunning())
                    throw new AbortSortingError();

                if (await compare(array[j], array[minIndex]) < 0) {
                    minIndex = j;
                }
            }

            // Swap the found minimum element with the first element
            if (minIndex !== i) {
                await swap(array, i, minIndex);
            }
        }

        return array
    }
}

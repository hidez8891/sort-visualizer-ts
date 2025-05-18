import {
    type ArrayItem,
    type RunningOption,
    type SortingAlgorithm,
    AbortSortingError
} from './types';

export class MergeSort implements SortingAlgorithm {
    name = 'Merge Sort';

    async sort(array: ArrayItem[], opt: RunningOption): Promise<ArrayItem[]> {
        await this.mergeSort(array, 0, array.length - 1, opt);
        return array;
    }

    async mergeSort(array: ArrayItem[], left: number, right: number, opt: RunningOption) {
        const { isRunning, compare, copyWith } = opt;

        if (left >= right)
            return;

        const mid = Math.floor((left + right) / 2);
        await this.mergeSort(array, left, mid, opt);
        await this.mergeSort(array, mid + 1, right, opt);

        // Merge the two halves
        const merged: ArrayItem[] = [];
        let i = left, j = mid + 1;

        // Compare elements
        while (i <= mid && j <= right) {
            if (!isRunning())
                throw new AbortSortingError();

            if (await compare(array[i], array[j]) <= 0) {
                merged.push(array[i]);
                i++;
            } else {
                merged.push(array[j]);
                j++;
            }
        }

        // Add remaining elements
        while (i <= mid) {
            merged.push(array[i]);
            i++;
        }
        while (j <= right) {
            merged.push(array[j]);
            j++;
        }

        // Update array with merged results
        await copyWith(array, left, merged, 0, merged.length - 1);
    }
}

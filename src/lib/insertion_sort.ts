import {
    type ArrayItem,
    type RunningOption,
    type SortingAlgorithm,
    AbortSortingError
} from './types';

export class InsertionSort implements SortingAlgorithm {
    name = 'Insertion Sort';

    async sort(array: ArrayItem[], opt: RunningOption): Promise<ArrayItem[]> {
        const { isRunning, compare, copyWith } = opt;
        const n = array.length;

        for (let i = 1; i < n; i++) {
            const arr = [...array];
            let key = i;
            let j = i - 1;

            while (j >= 0 && await compare(array[j], array[key]) > 0) {
                if (!isRunning())
                    throw new AbortSortingError();

                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = array[key];

            await copyWith(array, 0, arr, 0, i);
        }

        return array;
    }
}

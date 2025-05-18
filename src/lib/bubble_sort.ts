import {
    type ArrayItem,
    type RunningOption,
    type SortingAlgorithm,
    AbortSortingError
} from './types';

export class BubbleSort implements SortingAlgorithm {
    name = 'Bubble Sort';

    async sort(array: ArrayItem[], opt: RunningOption): Promise<ArrayItem[]> {
        const { isRunning, compare, swap } = opt;
        const n = array.length;

        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (!isRunning())
                    throw new AbortSortingError();

                if (await compare(array[j], array[j + 1]) > 0) {
                    await swap(array, j, j + 1);
                }
            }
        }

        return array;
    }
}

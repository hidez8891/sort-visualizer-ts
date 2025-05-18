import {
    type ArrayItem,
    type RunningOption,
    type SortingAlgorithm,
    AbortSortingError
} from './types';

export class CombSort implements SortingAlgorithm {
    name = 'Comb Sort';

    async sort(array: ArrayItem[], opt: RunningOption): Promise<ArrayItem[]> {
        const { isRunning, compare, swap } = opt;

        let gap = array.length;
        let swapped = true;

        while (gap > 1 || swapped) {
            if (!isRunning())
                throw new AbortSortingError();

            gap = Math.floor(gap / 1.3);
            if (gap < 1)
                gap = 1;
            swapped = false;

            for (let i = 0; i + gap < array.length; i++) {
                if (!isRunning())
                    throw new AbortSortingError();

                if (await compare(array[i], array[i + gap]) > 0) {
                    await swap(array, i, i + gap);
                    swapped = true;
                }
            }
        }

        return array;
    }
}

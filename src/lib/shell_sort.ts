import {
    type ArrayItem,
    type RunningOption,
    type SortingAlgorithm,
    AbortSortingError
} from './types';

export class ShellSort implements SortingAlgorithm {
    name = "Shell Sort";

    async sort(array: ArrayItem[], opt: RunningOption): Promise<ArrayItem[]> {
        const { isRunning, compare, copyWith } = opt;

        let n = array.length;
        let gap = Math.ceil(n / 3);

        while (gap > 0) {
            for (let i = gap; i < n; i++) {
                if (!isRunning())
                    throw new AbortSortingError();

                const maxIndex = i;
                let ary = [...array];

                // Compare and shift elements
                let j = i;
                while (j >= gap && await compare(array[j - gap], array[maxIndex]) > 0) {
                    if (!isRunning())
                        throw new AbortSortingError();

                    ary[j] = ary[j - gap];
                    j -= gap;
                }
                ary[j] = array[maxIndex];

                await copyWith(array, 0, ary, 0, ary.length - 1);
            }

            if (gap === 1)
                break;
            gap = Math.ceil(gap / 3);
        }

        return array
    }
}

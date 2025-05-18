import {
    type ArrayItem,
    type RunningOption,
    type SortingAlgorithm,
    AbortSortingError
} from './types';

export class BitonicSort implements SortingAlgorithm {
    name = 'Bitonic Sort';

    async sort(array: ArrayItem[], opt: RunningOption): Promise<ArrayItem[]> {
        const logn = Math.log2(array.length);

        for (let i = 0; i < logn; i++) {
            for (let j = 0; j <= i; j++) {
                await this.kernel(array, i, j, opt);
            }
        }

        return array;
    }

    async kernel(array: ArrayItem[], p: number, q: number, opt: RunningOption) {
        const { isRunning, compare, swap } = opt;

        const d = 1 << (p - q);
        const n = array.length;

        for (let i = 0; i < n; i++) {
            if (!isRunning())
                throw new AbortSortingError();

            const up = ((i >> p) & 2) == 0;
            if ((i & d) == 0 && (await compare(array[i], array[i | d]) > 0) === up) {
                await swap(array, i, i | d);
            }
        }
    }
}

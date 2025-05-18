import {
    type ArrayItem,
    type RunningOption,
    type SortingAlgorithm,
    AbortSortingError
} from './types';

export class HeapSort implements SortingAlgorithm {
    name = 'Heap Sort';

    async sort(array: ArrayItem[], opt: RunningOption): Promise<ArrayItem[]> {
        const { swap } = opt;

        const n = array.length;

        for (let i = 0; i < n; i++) {
            await this.upheap(array, i, opt);
        }

        for (let i = n - 1; i > 0; i--) {
            await swap(array, 0, i);
            await this.downheap(array, i, opt);
        }

        return array;
    }

    async upheap(array: ArrayItem[], i: number, opt: RunningOption): Promise<void> {
        const { isRunning, compare, swap } = opt;

        while (i > 0) {
            if (!isRunning())
                throw new AbortSortingError();

            const parent = Math.floor((i + 1) / 2 - 1);
            if (await compare(array[i], array[parent]) <= 0) {
                break; // Already a heap
            }
            await swap(array, i, parent);
            i = parent;
        }
    }

    async downheap(array: ArrayItem[], n: number, opt: RunningOption): Promise<void> {
        const { isRunning, compare, swap } = opt;

        let i = 0;
        while (i < n) {
            if (!isRunning())
                throw new AbortSortingError();

            const left = (i + 1) * 2 - 1;
            const right = (i + 1) * 2;
            let largest = i;

            if (left >= n)
                break; // No children

            if (await compare(array[left], array[largest]) > 0) {
                largest = left;
            }
            if (right < n && await compare(array[right], array[largest]) > 0) {
                largest = right;
            }
            if (largest === i)
                break; // Already a heap

            await swap(array, i, largest);
            i = largest;
        }
    }
}

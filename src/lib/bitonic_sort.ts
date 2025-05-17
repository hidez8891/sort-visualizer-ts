import type { ArrayItem } from './types';

// Bitonic sort algorithm
export async function bitonicSort(array: ArrayItem[], requireDraw: () => Promise<void>) {
    const logn = Math.log2(array.length);

    for (let i=0; i < logn; i++) {
        for (let j=0; j <= i; j++) {
            await kernel(array, i, j, requireDraw);
        }
    }

    // Highlight sorted elements
    for (let i = 0; i < array.length; i++) {
        array[i].color = 'green';
    }
    await requireDraw();
}

async function kernel(array: ArrayItem[], p: number, q: number, requireDraw: () => Promise<void>) {
    const d = 1 << (p - q);
    const n = array.length;

    for (let i = 0; i < n; i++) {
        const up = ((i >> p) & 2) == 0;

        // Highlight current elements
        array[i].color = 'orange';
        array[i | d].color = 'orange';
        await requireDraw();
        array[i].color = '';
        array[i | d].color = '';

        // Compare & Swap elements
        if ((i & d) == 0 && (array[i].value > array[i | d].value) == up) {
            [array[i], array[i | d]] = [array[i | d], array[i]];
        }
    }
}

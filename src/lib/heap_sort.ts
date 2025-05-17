import type { ArrayItem } from './types';

export async function heapSort(array: ArrayItem[], requireDraw: () => Promise<void>) {
    const n = array.length;

    for (let i = 0; i < n; i++) {
        await upheap(array, i, requireDraw);
    }

    for (let i = n - 1; i > 0; i--) {
        // Swap current root with the last element
        [array[0], array[i]] = [array[i], array[0]];

        await downheap(array, i, requireDraw);
    }

    for (let i = 0; i < array.length; i++) {
        array[i].color = 'green'; // Highlight sorted elements
    }
    await requireDraw();
}

async function upheap(array: ArrayItem[], i: number, requireDraw: () => Promise<void>) {
    while (i > 0) {
        const parent = Math.floor((i + 1) / 2 - 1);

        // Highlight current elements
        array[i].color = 'orange';
        array[parent].color = 'orange';
        await requireDraw();
        array[i].color = '';
        array[parent].color = '';

        if (array[i].value > array[parent].value) {
            // Swap if current element is greater than parent
            [array[i], array[parent]] = [array[parent], array[i]];
            i = parent;
        } else {
            break;
        }
    }
}

async function downheap(array: ArrayItem[], n: number, requireDraw: () => Promise<void>) {
    let i = 0;
    while (i < n) {
        const left = (i+1)*2-1;
        const right = (i+1)*2;
        let largest = i;

        if (left >= n)
            break; // No children

        // Highlight current elements
        array[left].color = 'orange';
        array[largest].color = 'orange';
        await requireDraw();
        array[left].color = '';
        array[largest].color = '';

        if (array[left].value > array[largest].value) {
            largest = left;
        }

        if (right < n) {
            // Highlight current elements
            array[right].color = 'orange';
            array[largest].color = 'orange';
            await requireDraw();
            array[right].color = '';
            array[largest].color = '';

            if (array[right].value > array[largest].value) {
                largest = right;
            }
        }

        if (largest === i)
            break; // Already a heap

        [array[i], array[largest]] = [array[largest], array[i]];
        i = largest;
    }
}

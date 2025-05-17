import type { ArrayItem } from './types';

// Comb sort algorithm
export async function combSort(array: ArrayItem[], requireDraw: () => Promise<void>) {
    let gap = array.length;
    let swapped = true;

    while (gap > 1 || swapped) {
        gap = Math.floor(gap / 1.3);
        if (gap < 1) gap = 1;
        swapped = false;

        for (let i = 0; i + gap < array.length; i++) {
            // Highlight current elements
            array[i].color = 'orange';
            array[i + gap].color = 'orange';
            await requireDraw();

            // Compare elements
            if (array[i].value > array[i + gap].value) {
                // Swap elements
                [array[i], array[i + gap]] = [array[i + gap], array[i]];
                swapped = true;
            }
            await requireDraw();

            // Reset color
            array[i].color = '';
            array[i + gap].color = '';
        }
    }

    for (let i = 0; i < array.length; i++) {
        array[i].color = 'green'; // Highlight sorted elements
    }
    await requireDraw();
}

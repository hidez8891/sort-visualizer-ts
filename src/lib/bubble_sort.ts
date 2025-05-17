import type { ArrayItem } from './types';

// Bubble sort algorithm
export async function bubbleSort(array: ArrayItem[], requireDraw: () => Promise<void>) {
    let n = array.length;

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            // Highlight current elements
            array[j].color = 'orange';
            array[j + 1].color = 'orange';
            await requireDraw();

            // Compare elements
            if (array[j].value > array[j + 1].value) {
                // Swap elements
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                await requireDraw();
            }

            // Reset color
            array[j].color = '';
            array[j + 1].color = '';
        }
    }

    for (let i = 0; i < array.length; i++) {
        array[i].color = 'green'; // Highlight sorted elements
    }
    await requireDraw();
}

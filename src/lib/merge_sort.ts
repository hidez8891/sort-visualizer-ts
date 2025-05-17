import type { ArrayItem } from './types';

// Merge sort algorithm
export async function mergeSort(array: ArrayItem[], requireDraw: () => Promise<void>) {
    await merge(array, 0, array.length - 1, requireDraw);

    for (let i = 0; i < array.length; i++) {
        array[i].color = 'green'; // Highlight sorted elements
    }
    await requireDraw();
}

async function merge(arr: ArrayItem[], left: number, right: number, requireDraw: () => Promise<void>): Promise<void> {
    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);
    await merge(arr, left, mid, requireDraw);
    await merge(arr, mid + 1, right, requireDraw);

    // Merge the two halves
    const merged: ArrayItem[] = [];
    let i = left, j = mid + 1;

    // Compare elements
    while (i <= mid && j <= right) {
        // Highlight merge boundaries
        arr[i].color = 'orange';
        arr[j].color = 'orange';
        await requireDraw();
        arr[i].color = '';
        arr[j].color = '';

        if (arr[i].value <= arr[j].value) {
            merged.push(arr[i]);
            i++;
        } else {
            merged.push(arr[j]);
            j++;
        }
    }

    // Add remaining elements
    while (i <= mid) {
        arr[i].color = 'orange';
        await requireDraw();
        arr[i].color = '';

        merged.push(arr[i]);
        i++;
    }
    while (j <= right) {
        arr[j].color = 'orange';
        await requireDraw();
        arr[j].color = '';

        merged.push(arr[j]);
        j++;
    }

    // Update array with merged results
    for (let k = 0; k < merged.length; k++) {
        arr[left + k] = merged[k];
    }
}

import type { ArrayItem } from './types';

export async function selectionSort(array: ArrayItem[], requireDraw: () => Promise<void>) {
  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    // Find the minimum element in remaining unsorted array
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      // Highlight current elements
      array[j].color = 'orange';
      array[minIndex].color = 'orange';
      await requireDraw();
      array[j].color = '';
      array[minIndex].color = '';

      if (array[j].value < array[minIndex].value) {
        minIndex = j;
      }
    }

    // Swap the found minimum element with the first element
    if (minIndex !== i) {
      // Perform swap
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
    }
  }

  // Highlight all sorted elements
  for (let i = 0; i < n; i++) {
    array[i].color = 'green';
  }
  await requireDraw();
}
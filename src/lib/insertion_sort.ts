import type { ArrayItem } from './types';

export async function insertionSort(array: ArrayItem[], requireDraw: () => Promise<void>) {
  const n = array.length;

  for (let i = 1; i < n; i++) {
    const arr = [...array];
    let key = arr[i];
    let j = i - 1;

    while (j >= 0) {
      // Highlight current elements
      array[i].color = 'orange';
      array[j].color = 'orange';
      await requireDraw();
      array[i].color = '';
      array[j].color = '';

      // Compare elements
      if (array[j].value < key.value) {
        break;
      }
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;

    for (let k = 0; k <= i; k++) {
      array[k] = arr[k];
    }
  }

  for (let i = 0; i < n; i++) {
    array[i].color = 'green'; // Highlight sorted elements
  }
}
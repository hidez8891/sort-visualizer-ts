import type { ArrayItem } from './types';

// Shell sort algorithm
export async function shellSort(array: ArrayItem[], requireDraw: () => Promise<void>) {
    let n = array.length;
    let gap = Math.ceil(n / 3);

    while (gap > 0) {
        for (let i = gap; i < n; i++) {
            let ary = [...array];
            let temp = ary[i];

            // Compare and shift elements
            let j = i;
            while (j >= gap) {
                // Highlight current elements
                array[i].color = 'orange';
                array[j - gap].color = 'orange';
                await requireDraw();
                array[i].color = '';
                array[j - gap].color = '';

                if (ary[j - gap].value <= temp.value)
                    break;

                ary[j] = ary[j - gap];
                j -= gap;
            }

            ary[j] = temp;

            for (let k = 0; k < n; k++) {
                array[k] = ary[k];
            }
        }

        if (gap === 1)
            break;
        gap = Math.ceil(gap / 3);
    }

    // Highlight sorted elements
    for (let i = 0; i < array.length; i++) {
        array[i].color = 'green';
    }
    await requireDraw();
}

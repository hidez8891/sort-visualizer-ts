export type ArrayItem = {
    value: number;
    color: string;
};

export type RunningOption = {
    isRunning(): boolean;
    compare: (a: ArrayItem, b: ArrayItem) => Promise<number>;
    swap: (array: ArrayItem[], i: number, j: number) => Promise<void>;
    copyWith: (dst: ArrayItem[], dst_index: number, src: ArrayItem[], start_idx: number, end_idx: number) => Promise<number>;
};

export interface SortingAlgorithm {
    name: string;
    sort: (array: ArrayItem[], opt: RunningOption) => Promise<ArrayItem[]>;
};

export class AbortSortingError extends Error {
    constructor() {
        super("Sorting was aborted");
        this.name = 'AbortSortingError';
    }
}

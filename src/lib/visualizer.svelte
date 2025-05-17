<script lang="ts">
    import type { ArrayItem } from './types';

    export let name: string;
    export let width: number;
    export let size: number;
    export let array: ArrayItem[];
</script>

<h1>{name}</h1>
<div style="display: flex; gap: {(width / size) < 15 ? '0px' : '5px'}; margin-top: 20px;" bind:clientWidth={width}>
    {#each array as item, index}
        <div
            style="flex: 1; background-color: {item.color || 'steelblue'}; height: {item.value * 3}px; transition: height 0.3s, background-color 0.3s;"
        ></div>
    {/each}
</div>
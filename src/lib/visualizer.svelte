<script lang="ts">
    import type { ArrayItem } from './types';

    let { name, size, array }: {
        name: string,
        size: number,
        array: ArrayItem[],
    } = $props();

	let width = $state(0);
</script>

<div>
    <h1>{name}</h1>
    <div style="display: flex; gap: {(width / size) < 15 ? '0px' : '5px'}; margin-top: 20px;" bind:clientWidth={width}>
        {#each array as item, index}
            <div
                style="flex: 1; background-color: {item.color || 'steelblue'}; height: {item.value * 3}px; transition: height 0.3s, background-color 0.3s;"
            ></div>
        {/each}
    </div>
</div>

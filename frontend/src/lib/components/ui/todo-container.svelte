<script lang="ts">
	import type { Todo } from '$lib/payload-types';
	import TodoItem from './todo-item.svelte';
	let { todoItems, deletefunc, editfunc }: { todoItems: Record<string, Todo>, editfunc: (data: Todo) => void, deletefunc: (id: string) => void } = $props();
</script>

<div class="flex h-full w-full flex-col overflow-y-auto">
	{#if todoItems == null}
		<p class="text-gray-500">Could not fetch todo items.</p>
	{:else if Object.keys(todoItems).length === 0}
		<p class="text-gray-500">No todo items available.</p>
	{:else}
		{#each Object.values(todoItems) as item (item.id)}
			<TodoItem ItemData={item} editfunc={editfunc} deletefunc={deletefunc} />
		{/each}
	{/if}
</div>

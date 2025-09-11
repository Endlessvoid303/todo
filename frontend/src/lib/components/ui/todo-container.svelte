<script lang="ts">
	import type { Todo } from '$lib/payload-types';
	import TodoItem from './todo-item.svelte';
	let { todoItems, editfunc }: { todoItems: Todo[], editfunc: (data: Todo) => void } = $props();
</script>

<div class="flex h-full w-full flex-col overflow-y-auto">
	{#if todoItems == null}
		<p class="text-gray-500">Could not fetch todo items.</p>
	{:else if todoItems.length === 0}
		<p class="text-gray-500">No todo items available.</p>
	{:else}
		{#each todoItems as item (item.id)}
			<TodoItem ItemData={item} editfunc={editfunc}/>
		{/each}
	{/if}
</div>

<script lang="ts">
	import TodoItem from './todo-item.svelte';

	export let todoItems;
</script>

<div class="flex h-full w-full flex-col overflow-y-auto">
	{#if todoItems.length === 0}
		<p class="text-gray-500">No todo items available.</p>
	{:else}
		{#each todoItems as item (item.id)}
			<TodoItem
				Title={item.title}
				Description={item.description}
				Deadline={item.deadline}
				Completed={item.completed}
			/>
		{/each}
	{/if}
</div>

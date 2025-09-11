<script lang="ts">
	import Card from './card/card.svelte';
	import Button from './button/button.svelte';
	import Checkbox from './checkbox/checkbox.svelte';
	import type { Todo } from '$lib/payload-types';
	import type { TodoTemplate } from '$lib/templates';
	import { isTodo } from '$lib/type-check';
	import { deleteTodo } from '$lib/api/todo';
	let { ItemData, editfunc }: { ItemData: Todo | TodoTemplate, editfunc: (data: Todo) => void | undefined} = $props();
    let deadlineDate: Date | undefined;
    let DeadlineDisplay: string | null = $state(null);
	let deadlineColor = $state();
    function parseDate(deadline: Todo["deadline"]) {
        if (deadline == null) {
            DeadlineDisplay = null;
            return;
        }
        deadlineDate = new Date(deadline);
		deadlineDate = new Date(
            deadlineDate.getFullYear(),
            deadlineDate.getMonth(),
            deadlineDate.getDate()
	    )
        DeadlineDisplay = new Date(
            deadlineDate.getFullYear(),
            deadlineDate.getMonth(),
            deadlineDate.getDate()
	    ).toDateString();
		deadlineColor = getDeadlineColor(deadlineDate);
    }
	$effect(() => {
		parseDate(ItemData.deadline);
	});
	
	function getDeadlineColor(deadline: Date | undefined) {
		if (deadline == null) return 'text-gray-500';
		const now = new Date();
		const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
		if (isNaN(deadline.getTime())) return 'text-gray-500';
		if (deadline < today) return 'text-red-500';
		if (deadline.getTime() === today.getTime()) return 'text-yellow-500';
		return 'text-green-600';
	}

	function deleteitem() {
		if (!isTodo(ItemData)) {
			console.error("ItemData is not a Todo");
			return;
		}
		deleteTodo(ItemData.id).then((res) => {
			console.log(res);
			// Optionally, you can add logic to remove the item from the UI
		}).catch((err) => {
			console.error(err);
		});
	}
	
</script>

<Card class="m-4 grid aspect-5/1 w-140 grid-cols-5 grid-rows-1 gap-0 p-2">
	<div id="checkbox" class="flex h-full items-center justify-center">
		<Checkbox bind:checked={ItemData.completed} class="h-15 w-15 rounded-full" />
	</div>
	<div class="col-span-3 flex flex-col justify-center gap-1 p-2">
		<h2 class="text-xl font-bold">{ItemData.title}</h2>
		<p>{ItemData.description}</p>
        {#if DeadlineDisplay}
		<p class="text-sm {deadlineColor}">Deadline: {DeadlineDisplay}</p>
        {/if}
	</div>
	{#if isTodo(ItemData)}
	<div class="row-span-2 grid gap-0">
		{#if editfunc}
		<Button onclick={() => editfunc(ItemData)} variant="outline" class="m-1">Edit</Button>
		{/if}
		<Button onclick={() => deleteitem()} variant="destructive" class="m-1">Delete</Button>
	</div>
	{/if}
</Card>

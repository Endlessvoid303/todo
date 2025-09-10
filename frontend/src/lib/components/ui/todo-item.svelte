<script lang="ts">
	import Card from './card/card.svelte';
	import Button from './button/button.svelte';
	import Checkbox from './checkbox/checkbox.svelte';
    export let id: string;
	export let Title: string;
	export let Description: string;
	export let Deadline: string;
    export let editfunc
    export let display = false
    let deadlineDate: Date;
    let deadline: Date = new Date();
    let DeadlineDisplay: string | null;
    function parseDate(dateStr: string) {
        if (Deadline === "" || Deadline === null || Deadline === undefined) {
            DeadlineDisplay = null;
            return;
        }
        deadlineDate = new Date(Deadline);
	    deadline = new Date(
            deadlineDate.getFullYear(),
            deadlineDate.getMonth(),
            deadlineDate.getDate()
	    );
        DeadlineDisplay = deadline.toDateString();
    }
	$:parseDate(Deadline);
	
	export let Completed: boolean;
	$: deadlineColor = (() => {
		const now = new Date();
		const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

		if (isNaN(deadline.getTime())) return 'text-gray-500';
		if (deadline < today) return 'text-red-500';
		if (deadline.getTime() === today.getTime()) return 'text-yellow-500';
		return 'text-green-600';
	})();
</script>

<Card class="m-4 grid aspect-5/1 w-140 grid-cols-5 grid-rows-1 gap-0 p-2">
	<div id="checkbox" class="flex h-full items-center justify-center">
		<Checkbox bind:checked={Completed} class="h-15 w-15 rounded-full" />
	</div>
	<div class="col-span-3 flex flex-col justify-center gap-1 p-2">
		<h2 class="text-xl font-bold">{Title}</h2>
		<p>{Description}</p>
        {#if DeadlineDisplay}
		<p class="text-sm {deadlineColor}">Deadline: {DeadlineDisplay}</p>
        {/if}
	</div>
    {#if !display}
	<div class="row-span-2 grid gap-0">
		<Button onclick={() => editfunc({ id, title: Title, description: Description, deadline: Deadline, completed: Completed })} variant="outline" class="m-1">Edit</Button>
		<Button variant="destructive" class="m-1">Delete</Button>
	</div>
    {/if}
</Card>

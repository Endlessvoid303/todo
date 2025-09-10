<script lang="ts">
	import Calendar from "./calendar/calendar.svelte";
    import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";
	import Card from "./card/card.svelte";
	import Input from "./input/input.svelte";
	import TodoItem from "./todo-item.svelte";
	import Textarea from "./textarea/textarea.svelte";
	import Button from "./button/button.svelte";
    import { createTodo } from "$lib/api/todo";
    import { getCurrentUser } from "$lib/api/user";
    import { onMount } from 'svelte';
    export let id = "";
    export let title = "";
    export let description = "";
    export let deadline = "";
    export let datebox = today(getLocalTimeZone());
    export let completed = false;
    export let editfunc
    let userId: string | null = null;
    onMount(async () => {
        const user = await getCurrentUser();
        userId = user.id;
    });
    let lastdatebox: CalendarDate = datebox;
    let displaydate: string = datebox.toString();
    function updateDisplayDate(datebox: CalendarDate) {
        if (datebox !== undefined) {
            displaydate = datebox.toString();
            deadline = new Date(datebox.year, datebox.month - 1, datebox.day+1).toISOString().split('T')[0];
        }
        
    }
    $: updateDisplayDate(datebox);
    function parseDate(dateStr: string) {
        if (dateStr === "") {
            datebox = today(getLocalTimeZone());
            return;
        }
        const deadlineDate = new Date(dateStr);
        datebox = new CalendarDate(
            deadlineDate.getFullYear(),
            deadlineDate.getMonth()+1,
            deadlineDate.getDate()
        );
    }
    $: parseDate(deadline);
    function Create() {
        console.log("Create");
        createTodo({
            title,
            description,
            completed,
            deadline:new Date(deadline),
            user: '68c12866666d22a2b5d57424'
        }).then((res) => {
            console.log(res);
        });
        Reset();
    }
    function Reset() {
        id = "";
        title = "";
        description = "";
        deadline = "";
        datebox = today(getLocalTimeZone());
        completed = false;
    }
    function Update() {
        console.log("Update");
        Reset();
    }
</script>
<Card class="m-8 flex content-center items-center p-4">
    <TodoItem
        id={id}
        Title={title}
        Description={description}
        Deadline={displaydate}
        Completed={completed}
        editfunc={editfunc}
        display
    />
    <Input bind:value={title} placeholder="Title" class="m-2" />
    <div class="grid grid-cols-2 gap-8">
        <Textarea bind:value={description} placeholder="Description" class="m-2" />
        <Calendar bind:value={datebox} type="single" class="m-2" />
    </div>
    <div class="grid grid-cols-2">
        {#if (id === "")}
            <Button variant="default" class="m-2" onclick={Create}>Create</Button>
        {:else}
            <Button variant="default" class="m-2" onclick={Update}>Update</Button>
        {/if}
        <Button variant="destructive" class="m-2" onclick={Reset}>Reset</Button>
    </div>
    <p>Deadline: {deadline}</p>
</Card>
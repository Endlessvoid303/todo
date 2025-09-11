<script lang="ts">
	import Calendar from "./calendar/calendar.svelte";
    import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";
	import Card from "./card/card.svelte";
	import Input from "./input/input.svelte";
	import TodoItem from "./todo-item.svelte";
	import Textarea from "./textarea/textarea.svelte";
	import Button from "./button/button.svelte";
    import { createTodo, updateTodo } from "$lib/api/todo";
    import { getCurrentUser } from "$lib/api/user";
    import { onMount } from 'svelte';
	import type { TodoTemplate } from "$lib/templates";
	import type { Todo } from "$lib/payload-types";
	import { isTodo } from "$lib/type-check";
    let { editfunc, ItemData }: { editfunc: (data: any) => void, ItemData: TodoTemplate | Todo } = $props();
    // export let id = "";
    // export let title = "";
    // export let description = "";
    // export let deadline = "";
    let datebox: CalendarDate | undefined = $state(undefined);
    // export let completed = false;
    let userId: string | null = null;
    onMount(async () => {
        const user = await getCurrentUser();
        userId = user.id;
    });
    let lastdatebox: CalendarDate | undefined;
    let displaydate: string | undefined;
    function updateDisplayDate(datebox: CalendarDate | undefined) {
        if (datebox !== undefined) {
            displaydate = datebox.toString();
            ItemData.deadline = new Date(datebox.year, datebox.month - 1, datebox.day+1).toISOString().split('T')[0];
        }
        
    }
    $effect(() => {
        if (datebox !== lastdatebox) {
            lastdatebox = datebox;
            updateDisplayDate(datebox);
        }
    });
    function parseDate(deadline: string | undefined | null) {
        if (deadline === "" || deadline === null || deadline === undefined) {
            datebox = undefined;
            return;
        }
        const deadlineDate = new Date(deadline);
        datebox = new CalendarDate(
            deadlineDate.getFullYear(),
            deadlineDate.getMonth()+1,
            deadlineDate.getDate()
        );
    }
    $effect(() => {
        parseDate(ItemData.deadline);
    });
    function Create() {
        console.log("Create");
        createTodo(ItemData).then((res) => {
            console.log(res);
        });
        Reset();
    }
    function Reset() {
        ItemData = {
            title: "",
            description: "",
            deadline: "",
            completed: false,
            user: '68c12866666d22a2b5d57424'
        };
        datebox = undefined;
    }
    function Update() {
        console.log("Update");
        if (!isTodo(ItemData)) {
            console.error("ItemData is not a Todo");
            return;
        }
        updateTodo(ItemData.id,ItemData).then((res) => {
            console.log(res);
        });
        Reset();
    }
</script>
<Card class="m-8 flex content-center items-center p-4">
    <TodoItem
        ItemData={ItemData}
        editfunc={editfunc}
    />
    <Input bind:value={ItemData.title} placeholder="Title" class="m-2" />
    <div class="grid grid-cols-2 gap-8">
        <Textarea bind:value={ItemData.description} placeholder="Description" class="m-2" />
        <Calendar bind:value={datebox} type="single" class="m-2" />
    </div>
    <div class="grid grid-cols-2">
        {#if (!isTodo(ItemData))}
            <Button variant="default" class="m-2" onclick={Create}>Create</Button>
        {:else}
            <Button variant="default" class="m-2" onclick={Update}>Update</Button>
        {/if}
        <Button variant="destructive" class="m-2" onclick={Reset}>Reset</Button>
    </div>
</Card>
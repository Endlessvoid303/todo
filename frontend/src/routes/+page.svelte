<script lang="ts">
    import TodoContainer from "$lib/components/ui/todo-container.svelte";
    export let data;
</script>

<main class="h-full w-full">
    <TodoContainer todoItems={data.todos.docs} />
</main>
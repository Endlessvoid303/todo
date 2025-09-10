<script lang="ts">
    import TodoContainer from "$lib/components/ui/todo-container.svelte";
	import TodoCreator from "$lib/components/ui/todo-creator.svelte";
    export let data;
    let editor = {
        id: "",
        title: "",
        description: "",
        deadline: "",
        completed: false
    }
    function Edit(
        data: { id: string; title: string; description: string; deadline: string; completed: boolean }
    ) {
        editor = {
            id: data.id,
            title: data.title,
            description: data.description,
            deadline: data.deadline,
            completed: data.completed
        };
    }
</script>

<main class="h-full w-full grid grid-cols-2">
    <TodoContainer todoItems={data.todos.docs} editfunc={Edit} />
    <TodoCreator
        editfunc={Edit}
        id={editor.id}
        title={editor.title}
        description={editor.description}
        deadline={editor.deadline}
        completed={editor.completed}
    />
</main>
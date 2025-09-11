<script lang="ts">
    import TodoContainer from "$lib/components/ui/todo-container.svelte";
	import TodoCreator from "$lib/components/ui/todo-creator.svelte";
	import type { Todo } from "$lib/payload-types.js";
	import type { TodoTemplate } from "$lib/templates.js";
    let { data } = $props();
    let editor : TodoTemplate | Todo = $state({
        title: "",
        description: "",
        deadline: undefined,
        completed: false,
        user: '68c12866666d22a2b5d57424'
    });
    function Edit(
        data: Todo
    ) {
        editor = data;
    }
</script>

<main class="h-full w-full grid grid-cols-2">
    <TodoContainer todoItems={data.todos.docs} editfunc={Edit} />
    <TodoCreator
        editfunc={Edit}
        ItemData={editor}
    />
</main>
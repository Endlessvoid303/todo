<script lang="ts">
	import { deleteTodo } from "$lib/api/todo.js";
    import TodoContainer from "$lib/components/ui/todo-container.svelte";
	import TodoCreator from "$lib/components/ui/todo-creator.svelte";
	import type { Todo } from "$lib/payload-types.js";
	import type { TodoTemplate } from "$lib/templates.js";
    let { data } = $props();
    let todos: Record<string, Todo> = $state({});
    data.todos.docs.forEach((item: Todo) => {
        todos[item.id] = item;
    });
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
        editor = { ...data };
    }
    function deleteitem(id: string) {
        deleteTodo(id)
        delete todos[id];
    }
</script>

<main class="h-full w-full grid grid-cols-2">
    <TodoContainer todoItems={todos} editfunc={Edit} deletefunc={deleteitem} />
    <TodoCreator
        editfunc={Edit}
        bind:ItemData={editor}
        allItems={todos}
        deletefunc={deleteitem}
    />
</main>
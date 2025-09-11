import type { Todo } from '$lib/payload-types';
import type { TodoTemplate } from '$lib/templates';
export async function createTodo(todo: TodoTemplate) {
	console.log('Creating todo:', todo);
	const res = await fetch('/api/todos', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		credentials: 'include',
		body: JSON.stringify(todo)
	});

	if (!res.ok) {
		console.error('Failed to create todo:', await res.text());
		return;
	}

	const data = await res.json();
	console.log('Created todo:', data);
	return data;
}

export async function updateTodo(id: string, todo: Todo) {
	console.log('Updating todo:', id, todo);
	const res = await fetch(`/api/todos/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		credentials: 'include',
		body: JSON.stringify(todo)
	});
	if (!res.ok) {
		console.error('Failed to update todo:', await res.text());
		return;
	}
	const data = await res.json();
	console.log('Updated todo:', data);
	return data;
}

export async function deleteTodo(id: string) {
	console.log('Deleting todo:', id);
	const res = await fetch(`/api/todos/${id}`, {
		method: 'DELETE',
		credentials: 'include'
	});
	if (!res.ok) {
		console.error('Failed to delete todo:', await res.text());
		return;
	}
	const data = await res.json();
	console.log('Deleted todo:', data);
	return data;
}

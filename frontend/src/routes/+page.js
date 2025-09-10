export async function load({ fetch }) {
	const response = await fetch('/api/todos');
	const todos = await response.json();
	return { todos };
}

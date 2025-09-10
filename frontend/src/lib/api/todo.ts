export async function createTodo(todo: {
	title: string;
	description: string;
	completed?: boolean;
	deadline?: Date;
	user: string;
}) {
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
}

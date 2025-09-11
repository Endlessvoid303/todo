import type { Todo } from '$lib/payload-types';
export type TodoTemplate = Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>;

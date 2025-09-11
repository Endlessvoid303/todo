import type { Todo } from './payload-types';
import type { TodoTemplate } from './templates';

export function isTodo(item: Todo | TodoTemplate): item is Todo {
	return (item as Todo).id !== undefined;
}

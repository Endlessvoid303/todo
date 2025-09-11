import type { Todo } from './payload-types';
import type { TodoTemplate } from './templates';
interface DataForTemplate {
	ItemData: TodoTemplate;
	editfunc?: undefined; // explicitly must be undefined
}

interface DataForTodo {
	ItemData: Todo;
	editfunc: (data: Todo) => void;
}

// The props type is a union of the two:
export type TodoData = DataForTemplate | DataForTodo;

export interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

export type TodoListProps = {
    todos: Todo[];
    onToggle: (id: number) => void;
    onAdd: (text: string) => void;
};
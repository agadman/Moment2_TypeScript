import { Todo } from "./Todo";

export class LocalStorageUtil {
    static saveTodos(todos: Todo[]): void {
        localStorage.setItem("todos", JSON.stringify(todos));
    }
    static loadTodos(): Todo[] {
        const todoStr = localStorage.getItem("todos");
        if (todoStr) {
            const rawData = JSON.parse(todoStr);
            return rawData.map((t: {task: string; completed: boolean; priority: number}) =>
                new Todo(t.task, t.priority, t.completed,));
        
        } else {
            return [];
        }
    }
}
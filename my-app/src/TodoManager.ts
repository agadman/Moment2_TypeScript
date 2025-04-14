import { Todo } from "./Todo";
import { LocalStorageUtil } from "./LocalStorageUtil";

export class TodoManager {
    private todos: Todo[] = [];

    constructor() {
        this.todos = LocalStorageUtil.loadTodos();
    }

    public addTodo(todo: Todo): void {
        this.todos.push(todo);
        LocalStorageUtil.saveTodos(this.todos);
    }

    public deleteTodo(index: number): void {
        this.todos.splice(index, 1);
        LocalStorageUtil.saveTodos(this.todos);
    }

    public getTodos(): Todo[] {
        return this.todos;
    }

    public markTodoCompleted(index: number): void {
        this.todos[index].completed = !this.todos[index].completed;
        LocalStorageUtil.saveTodos(this.todos);
    }
    
}
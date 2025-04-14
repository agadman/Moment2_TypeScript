import { ITodo } from "./ITodo";

export class Todo implements ITodo {
    task: string;
    completed: boolean;
    priority: number;

    constructor(task: string, priority: number, completed: boolean = false) {
        this.task = task;
        this.completed = completed;
        this.priority = priority;
    }

    public isValid(): boolean {
        return this.task.trim() !== '' && [1, 2, 3].includes(this.priority);
      }
}
import { ITodo } from "./ITodo";

export class Todo implements ITodo {
    task: string;
    completed: boolean;
    priority: number;

    constructor(task: string, priority: number) {
        this.task = task;
        this.completed = false;
        this.priority = priority;
    }
}
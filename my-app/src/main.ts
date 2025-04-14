import { Todo } from "./Todo";
import { TodoManager } from "./TodoManager";
import './style.css'

const todoManager = new TodoManager();

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("todo-form") as HTMLFormElement;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    addTodo();
  })
  renderTodos();
})

function addTodo(): void {
  const taskInput = document.getElementById('task') as HTMLInputElement;
  const priorityInput = document.getElementById("priority") as HTMLSelectElement;

  const task = taskInput.value;
  const priority = parseInt(priorityInput.value);

  if (task && priority) {
    const newTask = new Todo(task, priority)
    todoManager.addTodo(newTask);
    taskInput.value = '';
    priorityInput.value = '';
    renderTodos();
  } 
}

function renderTodos(): void {
  const todos = todoManager.getTodos();
  const todoList = document.getElementById('todo-list') as HTMLUListElement;

  if (todoList) {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
      const li = document.createElement('li');
      const checkbox = document.createElement("input");
      
      checkbox.type = "checkbox";
      checkbox.checked = todo.completed;
      checkbox.addEventListener("change", () => {
          markCompleted(index); 
      });

      const taskText = document.createElement("span");
      taskText.textContent = `${todo.task} (prio: ${todo.priority})`;

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => {
        deleteTodo(index);
      });

      li.appendChild(checkbox);
      li.appendChild(taskText);
      li.appendChild(deleteBtn);
      todoList.appendChild(li);
    });
  }
}

function deleteTodo(index: number): void {
  todoManager.deleteTodo(index);
  renderTodos();
}

function markCompleted(index: number): void {
  todoManager.markCompleted(index);
  renderTodos();
}
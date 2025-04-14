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
  const errorMessage = document.getElementById("error-message") as HTMLParagraphElement;

  const task = taskInput.value;
  const priority = parseInt(priorityInput.value);

  if (task && priority) {
    const newTask = new Todo(task, priority)
    todoManager.addTodo(newTask);
    taskInput.value = '';
    priorityInput.value = '';
    errorMessage.textContent = '';
    renderTodos();
  } else {
    errorMessage.textContent = "Fyll i både uppgift och välj en prioritet.";
  }
}

function getPriorityLabel(priority: number): string {
  switch (priority) {
    case 3:
      return "hög";
    case 2:
      return "medel";
    case 1:
      return "låg";
    default:
      return "";
  }
}

function renderTodos(): void {
  const todos = todoManager.getTodos();
  const todoList = document.getElementById('todo-list') as HTMLUListElement;

  todos.sort((a, b) => b.priority - a.priority);
  
  if (todoList) {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
      const li = document.createElement('li');
      li.classList.toggle("done", todo.completed);
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = todo.completed;
      checkbox.addEventListener("change", () => {
        markTodoCompleted(index); 
      });

      const taskText = document.createElement("span");
      taskText.textContent = `${todo.task} (prio: ${getPriorityLabel(todo.priority)})`;

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

function markTodoCompleted(index: number): void {
  todoManager.markTodoCompleted(index);
  renderTodos();
}
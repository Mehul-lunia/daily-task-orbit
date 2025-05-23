
import { Todo } from "../types/todo";


const API_URL = "http://localhost:8090/api";

export const todoService = {
  async getAllTodos(): Promise<Todo[]> {
    const response = await fetch(`${API_URL}`);
    if (!response.ok) throw new Error("Failed to fetch todos");
    // const res = response;
    // res.json().then((s) => console.log(s));
    return response.json();
  },

  async createTodo(todo: Omit<Todo, "id" | "created_at" | "updated_at">): Promise<Todo> {
    const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    });
    if (!response.ok) throw new Error("Failed to create todo");
    return response.json();
  },

  async updateTodoStatus(id: bigint, status: boolean): Promise<Todo> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "status" : status }),
    });
    if (!response.ok) throw new Error("Failed to update todo");
    return response.json();
  },

  async deleteTodo(id: bigint): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete todo");
  },
};

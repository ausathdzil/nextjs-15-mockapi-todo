export interface Todo {
  id: string;
  title: string;
  body: string;
}

export async function getTodos() {
  try {
    let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`);
    if (!res.ok) {
      throw new Error('Failed to fetch todos');
    }
    let todos: Todo[] = await res.json();
    return todos;
  } catch (error) {
    return null;
  }
}

export async function getTodo(id: string) {
  try {
    let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${id}`);
    if (!res.ok) {
      throw new Error('Failed to fetch todo');
    }
    let todo: Todo = await res.json();
    return todo;
  } catch (error) {
    return null;
  }
}

interface Todo {
  id: string;
  createdAt: string;
  title: string;
  status: string;
}

export async function getTodos() {
  let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`);
  let todos: Todo[] = await res.json();
  return todos;
}

export async function getTodo(id: string) {
  let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`);
  let todo: Todo = await res.json();
  return todo;
}

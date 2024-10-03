import CreateTodoForm from '@/components/create-todo-form';
import DeleteTodoForm from '@/components/delete-todo-form';
import { Toaster } from '@/components/ui/sonner';
import { getTodos } from '@/lib/data';
import Link from 'next/link';

export default async function Home() {
  let todos = await getTodos();

  if (!todos) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl text-center">Failed to fetch todos</h1>
      </div>
    );
  }

  return (
    <section className="w-full max-w-md space-y-8">
      <CreateTodoForm />
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            className="p-4 flex items-center justify-between shadow rounded-lg"
            key={todo.id}
          >
            <div className="flex flex-col">
              <Link className="hover:underline" href={`/todo/${todo.id}`}>
                {todo.title}
              </Link>
              <p className="text-sm text-zinc-500">{todo.body}</p>
            </div>
            <DeleteTodoForm id={todo.id} />
          </li>
        ))}
      </ul>
      <Toaster />
    </section>
  );
}

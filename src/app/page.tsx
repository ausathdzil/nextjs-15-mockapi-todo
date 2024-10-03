import CreateTodoForm from '@/components/create-todo-form';
import DeleteTodoForm from '@/components/delete-todo-form';
import { Toaster } from '@/components/ui/sonner';
import { getTodos } from '@/lib/data';
import Link from 'next/link';

export default async function Home() {
  let todos = await getTodos();

  return (
    <section className="w-full max-w-md space-y-8">
      <CreateTodoForm />
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            className="p-4 flex items-center justify-between border border-zinc-500 rounded-lg"
            key={todo.id}
          >
            <Link className="hover:underline" href={`/todo/${todo.id}`}>
              {todo.title}
            </Link>
            <DeleteTodoForm id={todo.id} />
          </li>
        ))}
      </ul>
      <Toaster />
    </section>
  );
}

import CreateTodoForm from '@/components/create-todo-form';
import DeleteTodoForm from '@/components/delete-todo-form';
import { getTodos } from '@/lib/data';
import Link from 'next/link';

export default async function Home() {
  let todos = await getTodos();

  return (
    <section className="space-y-2">
      <CreateTodoForm />
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            className="flex justify-between items-center border-2 border-foreground rounded p-2"
            key={todo.id}
          >
            <Link
              className="hover:underline"
              href={`/todo/${todo.id}`}
            >
              {todo.title}
            </Link>
            <DeleteTodoForm id={todo.id} />
          </li>
        ))}
      </ul>
    </section>
  );
}

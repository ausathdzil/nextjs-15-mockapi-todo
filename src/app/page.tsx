import CreateTodoForm from '@/app/components/create-todo-form';
import { getTodos } from '@/app/lib/data';
import Link from 'next/link';

export default async function Home() {
  let todos = await getTodos();

  return (
    <section className="space-y-2">
      <CreateTodoForm />
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            className="border-2 border-foreground rounded p-2"
            key={todo.id}
          >
            <Link
              className="hover:underline"
              href={`/todo/${todo.id}`}
            >
              {todo.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}


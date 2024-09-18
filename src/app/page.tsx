import CreateTodoForm from './components/create-todo-form';
import { getTodos } from './lib/data';

export default async function Home() {
  let todos = await getTodos();

  return (
    <main className="flex flex-col items-center gap-4 p-8">
      <h1 className="text-5xl font-bold">My Todos</h1>
      <CreateTodoForm />
      <ul className="w-3/4 sm:w-2/4 lg:w-1/4 space-y-2">
        {todos.map((todo) => (
          <li
            className="border-2 border-foreground rounded p-2"
            key={todo.id}
          >
            {todo.title}
          </li>
        ))}
      </ul>
    </main>
  );
}

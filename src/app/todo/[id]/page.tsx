import UpdateTodoForm from '@/components/update-todo-form';
import { getTodo } from '@/lib/data';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  let todo = await getTodo(params.id);

  if (!todo) {
    notFound();
  }

  return (
    <section className="space-y-2">
      <h1 className="text-lg font-bold">Update Todo: {todo.title}</h1>
      <UpdateTodoForm todo={todo} />
    </section>
  );
}

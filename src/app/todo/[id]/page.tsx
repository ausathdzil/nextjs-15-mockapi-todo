import UpdateTodoForm from '@/app/components/update-todo-form';
import { getTodo } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  let todo = await getTodo(params.id);

  if (!todo) {
    notFound();
  }

  return (
    <section className="space-y-2">
      <h1>Update Todo: {todo.title}</h1>
      <UpdateTodoForm todo={todo} />
    </section>
  );
}

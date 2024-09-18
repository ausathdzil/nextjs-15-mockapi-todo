'use client';

import { deleteTodo } from '@/lib/actions';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

const initialState = {
  message: '',
};

export default function DeleteTodoForm({ id }: { id: string }) {
  const deleteTodoById = deleteTodo.bind(null, id);
  const [state, formAction] = useActionState(deleteTodoById, initialState);
  const { pending } = useFormStatus();

  return (
    <form action={formAction}>
      <button
        className="bg-red-500 text-white px-2 py-1 rounded"
        disabled={pending}
        type="submit"
      >
        Delete
      </button>
    </form>
  );
}

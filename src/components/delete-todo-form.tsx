'use client';

import { deleteTodo } from '@/lib/actions';
import { useActionState } from 'react';
import { Button } from './ui/button';

const initialState = {
  message: '',
};

export default function DeleteTodoForm({ id }: { id: string }) {
  const deleteTodoById = deleteTodo.bind(null, id);
  const [state, formAction, pending] = useActionState(
    deleteTodoById,
    initialState
  );

  return (
    <form action={formAction}>
      <Button
        type="submit"
        variant="destructive"
        disabled={pending}
      >
        Delete
      </Button>
    </form>
  );
}

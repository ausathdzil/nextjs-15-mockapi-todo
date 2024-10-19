'use client';

import { Button } from '@/components/ui/button';
import { deleteTodo } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import { startTransition, useActionState, useEffect } from 'react';
import { toast } from 'sonner';

export default function DeleteTodoForm({ id }: { id: string }) {
  const deleteTodoById = deleteTodo.bind(null, id);
  const [state, formAction, pending] = useActionState(deleteTodoById, null);
  const { push } = useRouter();

  useEffect(() => {
    if (state && state.message) {
      if (state.success) {
        toast.success(state.message);
      } else {
        toast.error(state.message);
      }

      push('/');
    }
  }, [state]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    startTransition(() => {
      formAction();
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <Button type="submit" variant="destructive" disabled={pending}>
        Delete
      </Button>
    </form>
  );
}

'use client';

import { Button } from '@/components/ui/button';
import { deleteTodo } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';

export default function DeleteTodoForm({ id }: { id: string }) {
  const deleteTodoById = deleteTodo.bind(null, id);
  const [state, formAction, pending] = useActionState(deleteTodoById, null);
  const router = useRouter();

  useEffect(() => {
    if (state && state.message) {
      if (state.success) {
        toast.success(state.message);
      } else {
        toast.error(state.message);
      }

      router.push('/');
    }
  }, [state]);

  return (
    <form action={formAction}>
      <Button type="submit" variant="destructive" disabled={pending}>
        Delete
      </Button>
    </form>
  );
}

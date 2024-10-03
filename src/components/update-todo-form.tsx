'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { updateTodo } from '@/lib/actions';
import { Todo } from '@/lib/data';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';

export default function UpdateTodoForm({ todo }: { todo: Todo }) {
  const updateTodoById = updateTodo.bind(null, todo.id);
  const [state, formAction, pending] = useActionState(updateTodoById, null);
  const router = useRouter();

  useEffect(() => {
    if (state && state.message) {
      if (state.success) {
        toast.success(state.message);
        setTimeout(() => router.push('/'), 1000);
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <form className="space-y-4" action={formAction}>
      <Input id="title" name="title" defaultValue={todo.title} />
      {state?.errors?.title && (
        <p className="text-sm text-destructive">{state.errors.title}</p>
      )}

      <Input id="body" name="body" defaultValue={todo.body} />
      {state?.errors?.body && (
        <p className="text-sm text-destructive">{state.errors.body}</p>
      )}

      <div className="flex justify-between items-center gap-2">
        <Link href="/">
          <Button variant="secondary">Cancel</Button>
        </Link>
        <Button type="submit" disabled={pending}>
          Update todo
        </Button>
      </div>
    </form>
  );
}

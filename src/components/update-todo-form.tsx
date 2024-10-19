'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { State, updateTodo } from '@/lib/actions';
import { Todo } from '@/lib/data';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { startTransition, useActionState, useEffect } from 'react';
import { toast } from 'sonner';

export default function UpdateTodoForm({ todo }: { todo: Todo }) {
  const initialState: State = {
    success: false,
    message: null,
    errors: {},
  };
  const updateTodoById = updateTodo.bind(null, todo.id);
  const [state, formAction, pending] = useActionState(
    updateTodoById,
    initialState
  );
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

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    startTransition(() => {
      formAction(new FormData(event.currentTarget));
    });
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          name="title"
          defaultValue={todo.title}
          placeholder="Todo title"
        />
        {state?.errors?.title && (
          <p className="text-sm text-destructive">{state.errors.title}</p>
        )}
      </div>

      <div>
        <Label htmlFor="body">Body</Label>
        <Textarea
          name="body"
          defaultValue={todo.body}
          placeholder="Todo body"
        />
        {state?.errors?.body && (
          <p className="text-sm text-destructive">{state.errors.body}</p>
        )}
      </div>

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

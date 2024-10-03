'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import createTodo, { State } from '@/lib/actions';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';

export default function CreateTodoForm() {
  const initialState: State = {
    success: false,
    message: null,
    errors: {},
  }
  const [state, formAction, pending] = useActionState(createTodo, initialState);

  useEffect(() => {
    if (state && state.message) {
      if (state.success) {
        toast.success(state.message);
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <form className="space-y-2" action={formAction}>
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" placeholder="Todo title" />
        {state?.errors?.title && (
          <p className="text-sm text-destructive">{state.errors.title}</p>
        )}
      </div>

      <div>
        <Label htmlFor="body">Body</Label>
        <Textarea id="body" name="body" placeholder="Todo body" />
        {state?.errors?.body && (
          <p className="text-sm text-destructive">{state.errors.body}</p>
        )}
      </div>

      <Button type="submit" disabled={pending}>
        Add todo
      </Button>
    </form>
  );
}

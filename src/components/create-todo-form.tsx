'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import createTodo from '@/lib/actions';
import { useActionState } from 'react';

const initialState = {
  message: '',
};

export default function CreateTodoForm() {
  const [state, formAction, pending] = useActionState(createTodo, initialState);

  return (
    <>
      <form
        className="space-y-2"
        action={formAction}
      >
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
        />
        <Button
          type="submit"
          disabled={pending}
        >
          Add todo
        </Button>
      </form>
      <p aria-live="polite">{state?.message}</p>
    </>
  );
}

'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createTodo } from '@/lib/test';
import { useActionState } from 'react';

const initialState = {
  success: false,
  errors: {
    title: [],
    body: [],
  },
};

export default function Form() {
  const [state, formAction, pending] = useActionState(createTodo, initialState);

  return (
    <form className="space-y-2" action={formAction}>
      <Label htmlFor="title">Title</Label>
      <Input name="title" type="text" />
      {state.errors?.title && <p>{state.errors.title}</p>}

      <Label htmlFor="body">Body</Label>
      <Input name="body" type="text" disabled={pending} />
      {state.errors?.body && <p>{state.errors.body}</p>}

      <Button type="submit" disabled={pending}>
        {pending ? 'Submitting...' : 'Submit'}
      </Button>

      <p>{state.message}</p>
    </form>
  );
}

'use client';

import { createTodo, State } from '@/app/test/action';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useActionState } from 'react';

export default function Form2() {
  const initialState: State = {
    success: false,
    message: null,
    errors: {
      title: [],
      body: [],
    },
  };
  const [state, formAction, pending] = useActionState(createTodo, initialState);

  return (
    <form className="space-y-2" action={formAction}>
      <Input name="title" type="text" />
      {state.errors?.title && <p>{state.errors.title.join(', ')}</p>}

      <Input name="body" type="text" disabled={pending} />
      {state.errors?.body && <p>{state.errors.body.join(', ')}</p>}

      <Button type="submit" disabled={pending}>
        {pending ? 'Submitting...' : 'Submit'}
      </Button>
      {state.message && <p>{state.message}</p>}
    </form>
  );
}

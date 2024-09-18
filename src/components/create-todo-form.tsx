'use client';

import createTodo from '@/lib/actions';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

const initialState = {
  message: '',
};

export default function CreateTodoForm() {
  const [state, formAction] = useActionState(createTodo, initialState);
  const { pending } = useFormStatus();

  return (
    <>
      <form
        className="flex gap-1 border-2 border-foreground rounded p-2"
        action={formAction}
      >
        <label
          className="sr-only"
          htmlFor="title"
        >
          Title
        </label>
        <input
          className="w-full border-2 border-foreground rounded px-2 py-1"
          type="text"
          id="title"
          name="title"
          placeholder="Add a new todo"
        />
        <button
          className="bg-foreground text-background rounded px-4 py-2"
          disabled={pending}
          type="submit"
        >
          Create
        </button>
      </form>
      <p aria-live="polite">{state?.message}</p>
    </>
  );
}

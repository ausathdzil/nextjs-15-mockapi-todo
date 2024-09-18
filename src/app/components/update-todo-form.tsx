'use client';

import { updateTodo } from '@/app/lib/actions';
import { Todo } from '@/app/lib/data';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

const initialState = {
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-foreground text-background rounded px-4 py-2"
      disabled={pending}
      type="submit"
    >
      Update
    </button>
  );
}

export default function UpdateTodoForm({ todo }: { todo: Todo }) {
  const updateTodoById = updateTodo.bind(null, todo.id);
  const [state, formAction] = useActionState(updateTodoById, initialState);

  return (
    <>
      <form
        className="flex flex-col gap-4"
        action={formAction}
      >
        <input
          className="w-full border-2 border-foreground rounded px-2 py-1"
          type="text"
          name="title"
          defaultValue={todo.title}
          placeholder="Title"
        />
        <input
          className="w-full border-2 border-foreground rounded px-2 py-1"
          type="status"
          name="status"
          defaultValue={todo.status}
          placeholder="Status"
        />
        <SubmitButton />
      </form>
    </>
  );
}

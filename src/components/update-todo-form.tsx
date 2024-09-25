'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { updateTodo } from '@/lib/actions';
import { Todo } from '@/lib/data';
import Link from 'next/link';
import { useActionState } from 'react';

const initialState = {
  message: '',
};

export default function UpdateTodoForm({ todo }: { todo: Todo }) {
  const updateTodoById = updateTodo.bind(null, todo.id);
  const [state, formAction, pending] = useActionState(
    updateTodoById,
    initialState
  );

  return (
    <>
      <form
        className="space-y-4"
        action={formAction}
      >
        <Input
          id="title"
          name="title"
          defaultValue={todo.title}
        />
        <Input
          id="status"
          name="status"
          defaultValue={todo.status}
        />
        <div className="flex justify-between items-center gap-2">
          <Link href="/">
            <Button variant="secondary">Cancel</Button>
          </Link>
          <Button
            type="submit"
            disabled={pending}
          >
            Update todo
          </Button>
        </div>
      </form>
    </>
  );
}

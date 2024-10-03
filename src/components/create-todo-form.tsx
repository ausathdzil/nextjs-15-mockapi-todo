'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import createTodo from '@/lib/actions';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';

const initialState = {
  message: '',
  success: false,
};

export default function CreateTodoForm() {
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
      <Label htmlFor="title">Title</Label>
      <Input id="title" name="title" />
      <Button type="submit" disabled={pending}>
        Add todo
      </Button>
    </form>
  );
}

'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createTodo } from '@/lib/test';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';

export default function Form() {
  const { pending } = useFormStatus();
  const [error, setError] = useState<string | null>(null);
  const [titleError, setTitleError] = useState<string[] | null>(null);
  const [bodyError, setBodyError] = useState<string[] | null>(null);

  async function handleSubmit(formData: FormData) {
    const result = await createTodo(formData);

    if (!result.success) {
      setError(result.message ?? null);

      if (result.errors?.title) {
        setTitleError(result.errors.title);
      }

      if (result.errors?.body) {
        setBodyError(result.errors.body);
      }

    } else {
      setError(null);
    }
  }

  return (
    <form className="space-y-2" action={handleSubmit}>
      <Label htmlFor="title">Title</Label>
      <Input name="title" type="text" />
      {titleError && <p>{titleError.join(', ')}</p>}

      <Label htmlFor="body">Body</Label>
      <Input name="body" type="text" disabled={pending} />
      {bodyError && <p>{bodyError.join(', ')}</p>}

      <Button type="submit" disabled={pending}>
        {pending ? 'Submitting...' : 'Submit'}
      </Button>
      {error && <p>{error}</p>}
    </form>
  );
}

'use client';

import { addTodo } from '@/app/test/action';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';

export default function Form1() {
  const { pending } = useFormStatus();
  const [error, setError] = useState<string | null>(null);
  const [fieldErros, setFieldErrors] = useState<{
    title?: string[];
    body?: string[];
  } | null>(null);

  async function handleSubmit(formData: FormData) {
    const result = await addTodo(formData);

    if (!result.success) {
      setError(result.message ?? null);
      setFieldErrors(result.errors ?? null);
    } else {
      setError(null);
      setFieldErrors(null);
    }
  }

  return (
    <form className="space-y-2" action={handleSubmit}>
      <Input name="title" type="text" />
      {fieldErros?.title && <p>{fieldErros.title.join(', ')}</p>}

      <Input name="body" type="text" disabled={pending} />
      {fieldErros?.body && <p>{fieldErros.body.join(', ')}</p>}

      <Button type="submit" disabled={pending}>
        {pending ? 'Submitting...' : 'Submit'}
      </Button>
      {error && <p>{error}</p>}
    </form>
  );
}

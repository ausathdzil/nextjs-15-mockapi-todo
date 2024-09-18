'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const FormSchema = z.object({
  createdAt: z.string(),
  title: z.string().min(1),
  status: z.string(),
});

export default async function createTodo(
  prevState: { message: string },
  formData: FormData
) {
  const validatedFields = FormSchema.safeParse({
    createdAt: new Date().toISOString(),
    title: formData.get('title'),
    status: 'pending',
  });

  if (!validatedFields.success) {
    return {
      message: 'Failed to create todo',
    };
  }

  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedFields.data),
    });

    revalidatePath('/');
    return {
      message: `Added todo: ${validatedFields.data.title}`,
    };
  } catch (error) {
    return {
      message: 'Failed to create todo',
    };
  }
}

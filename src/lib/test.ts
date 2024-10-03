'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const formSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: 'Title is required',
    })
    .max(50, {
      message: 'Title must be less than 50 characters',
    }),
  body: z
    .string()
    .min(1, {
      message: 'Body is required',
    })
    .max(500, {
      message: 'Body must be less than 500 characters',
    }),
});

export async function createTodo(prevState: any, formData: FormData) {
  const validatedFields = formSchema.safeParse({
    title: formData.get('title'),
    body: formData.get('body'),
  });

  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;
    return {
      success: false,
      errors,
    };
  }

  try {
    const res = await fetch(
      'https://66c18b97f83fffcb58798e8c.mockapi.io/api/v1/todos',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedFields.data),
      }
    );

    if (!res.ok) {
      throw new Error('Failed to create todo');
    }

    revalidatePath('/todos');
    return { success: true, message: 'Todo created successfully' };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    } else {
      return { success: false, message: 'An unknown error occurred' };
    }
  }
}

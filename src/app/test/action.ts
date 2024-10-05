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

export type State = {
  success: boolean;
  message?: string | null;
  errors?: {
    title?: string[];
    body?: string[];
  };
}

export async function createTodo(prevState: State, formData: FormData) {
  const validatedFields = formSchema.safeParse({
    title: formData.get('title'),
    body: formData.get('body'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await fetch(
      'NEXT_PUBLIC_API_URL=https://66c18b97f83fffcb58798e8c.mockapi.io/api/v1/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedFields.data),
      }
    );
  } catch (error) {
    return {
      success: false,
      message: 'Failed to create todo',
    };
  }

  revalidatePath('/todos');
  return { success: true, message: 'Todo created successfully' };
}

export async function addTodo(formData: FormData) {
  const validatedFields = formSchema.safeParse({
    title: formData.get('title'),
    body: formData.get('body'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await fetch(
      'NEXT_PUBLIC_API_URL=https://66c18b97f83fffcb58798e8c.mockapi.io/api/v1/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedFields.data),
      }
    );
  } catch (error) {
    return {
      success: false,
      message: 'Failed to create todo',
    };
  }

  revalidatePath('/todos');
  return { success: true, message: 'Todo created successfully' };
}

'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const FormSchema = z.object({
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
    .max(200, {
      message: 'Body must be less than 200 characters',
    }),
});

export type State = {
  success: boolean;
  message?: string | null;
  errors?: {
    title?: string[];
    body?: string[];
  };
};

export default async function createTodo(prevState: State, formData: FormData) {
  const validatedFields = FormSchema.safeParse({
    title: formData.get('title'),
    body: formData.get('body'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid form data',
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
  } catch (error) {
    return {
      success: false,
      message: 'Failed to add todo',
    };
  }

  revalidatePath('/');
  return {
    success: true,
    message: `Added todo: ${validatedFields.data.title}`,
  };
}

export async function updateTodo(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = FormSchema.safeParse({
    title: formData.get('title'),
    body: formData.get('body'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid form data',
    };
  }

  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedFields.data),
    });
  } catch (error) {
    return {
      success: false,
      message: 'Failed to update todo',
    };
  }

  revalidatePath('/');
  return {
    success: true,
    message: `Updated todo with id: ${id}`,
  };
}

export async function deleteTodo(id: string, prevState: any) {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    return {
      success: false,
      message: 'Failed to delete todo',
    };
  }

  return {
    success: true,
    message: `Deleted todo with id: ${id}`,
  };
}

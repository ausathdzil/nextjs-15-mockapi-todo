'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const FormSchema = z.object({
  createdAt: z.string(),
  title: z.string().min(1),
  status: z.string(),
});

export default async function createTodo(
  prevState: { message: string; success: boolean },
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
      success: false,
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
      success: true,
    };
  } catch (error) {
    return {
      message: 'Failed to create todo',
      success: false,
    };
  }
}

const UpdateTodoSchema = z.object({
  createdAt: z.string(),
  title: z.string().min(1),
  status: z.string(),
});

export async function updateTodo(
  id: string,
  prevState: { message: string; success: boolean },
  formData: FormData
) {
  const validatedFields = UpdateTodoSchema.safeParse({
    createdAt: new Date().toISOString(),
    title: formData.get('title'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Failed to update todo',
      success: false,
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

    revalidatePath('/');
    return {
      message: `Updated todo: ${id}`,
      success: true,
    };
  } catch (error) {
    return {
      message: 'Failed to update todo',
      success: false,
    };
  }
}

export async function deleteTodo(
  id: string,
  prevState: { message: string; success: boolean }
) {
  try {
    let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      throw new Error('Failed to delete todo');
    }

    return {
      message: `Deleted todo: ${id}`,
      success: true,
    };
  } catch (error) {
    return {
      message: 'Failed to delete todo',
      success: false,
    };
  }
}

'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
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

const UpdateTodoSchema = z.object({
  createdAt: z.string(),
  title: z.string().min(1),
  status: z.string(),
});

export async function updateTodo(
  id: string,
  prevState: { message: string },
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
      message: 'Failed to update todo',
    };
  }

  revalidatePath('/');
  redirect('/');
}

export async function deleteTodo(id: string, prevState: { message: string }) {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    return {
      message: 'Failed to delete todo',
    };
  }

  revalidatePath('/');
  redirect('/');
}

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

export default async function createTodo(prevState: any, formData: FormData) {
  const validatedFields = FormSchema.safeParse({
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
    let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedFields.data),
    });

    if (!res.ok) {
      throw new Error('Failed to create todo');
    }

    revalidatePath('/');
    return {
      success: true,
      message: `Added todo: ${validatedFields.data.title}`,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    } else {
      return {
        success: false,
        message: 'An unknown error occurred',
      };
    }
  }
}

export async function updateTodo(
  id: string,
  prevState: any,
  formData: FormData
) {
  const validatedFields = FormSchema.safeParse({
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
    let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedFields.data),
    });

    if (!res.ok) {
      throw new Error('Failed to update todo');
    }

    revalidatePath('/');
    return {
      message: `Updated todo with id: ${id}`,
      success: true,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    } else {
      return {
        success: false,
        message: 'An unknown error occurred',
      };
    }
  }
}

export async function deleteTodo(id: string, prevState: any) {
  try {
    let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      throw new Error('Failed to delete todo');
    }

    return {
      success: true,
      message: `Deleted todo with id: ${id}`,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    } else {
      return {
        success: false,
        message: 'An unknown error occurred',
      };
    }
  }
}

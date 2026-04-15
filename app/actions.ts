'use server'

import { revalidatePath } from 'next/cache';
import { ObjectId } from 'mongodb';
import { z } from 'zod';
import { getDb } from '@/lib/db';
import { addEmployeeSchema, AddEmployeeInput } from '@/lib/types';
import type { Department } from '@/lib/types';

export async function addEmployee(formData: FormData, departments: Department[]) {
  // Parse and validate
  const validated = addEmployeeSchema.safeParse(Object.fromEntries(formData));

  if (!validated.success) {
    return {
      error: validated.error.format(),
    };
  }

  const input: AddEmployeeInput = validated.data;

  // Check if department exists
  const dept = departments.find(d => d._id.toString() === input.departmentId);
  if (!dept) {
    return {
      error: { departmentId: ['Invalid department'] },
    };
  }

  try {
    const { employees } = await getDb();
    await employees.insertOne({
      name: input.name,
      position: input.position,
      salary: input.salary,
      departmentId: new ObjectId(input.departmentId),
    });

    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Add employee error:', error);
    return {
      error: { _errors: ['Failed to add employee. Please try again.'] },
    };
  }
}


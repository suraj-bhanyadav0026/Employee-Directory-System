import { z } from 'zod'
import type { ObjectId } from 'mongodb'

// Core types
export interface Department {
  _id: ObjectId;
  name: string;
  floor: number;
}

export interface Employee {
  _id: ObjectId;
  name: string;
  position: string;
  salary: number;
  departmentId: ObjectId;
}

export interface EmployeeWithDept extends Employee {
  department: Pick<Department, '_id' | 'name' | 'floor'>;
}

// Zod schemas
export const addEmployeeSchema = z.object({
  name: z.string().min(1, 'Name required').max(100),
  position: z.string().min(1, 'Position required').max(100),
  salary: z.coerce.number().min(0, 'Salary must be positive'),
  departmentId: z.string().min(1, 'Department required'),
});

export type AddEmployeeInput = z.infer<typeof addEmployeeSchema> & { departmentId: string };


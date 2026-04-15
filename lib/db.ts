import { MongoClient, ObjectId, Db, Collection } from 'mongodb';
import { Employee, Department, EmployeeWithDept } from './types';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in .env.local');
}

interface DB {
  employees: Collection<Employee>;
  departments: Collection<Department>;
}

let client: MongoClient;
let db: Db | null = null;

async function connectToDatabase(): Promise<Db> {
  if (db) return db;

  client = new MongoClient(MONGODB_URI);
  await client.connect();
  db = client.db('staffsphere');
  return db;
}

export async function getDb(): Promise<DB> {
  const database = await connectToDatabase();
  return {
    employees: database.collection<Employee>('employees'),
    departments: database.collection<Department>('departments'),
  };
}

// Fetch all employees with department join via aggregation
export async function getEmployees(deptId?: string): Promise<EmployeeWithDept[]> {
  const { employees } = await getDb();

  const pipeline: any[] = [
    {
      $lookup: {
        from: 'departments',
        localField: 'departmentId',
        foreignField: '_id',
        as: 'department',
      },
    },
    {
      $unwind: '$department',
    },
    {
      $project: {
        name: 1,
        position: 1,
        salary: 1,
        departmentId: 1,
        department: {
          _id: 1,
          name: 1,
          floor: 1,
        },
      },
    },
  ];

  if (deptId) {
    pipeline.push({
      $match: { 'department._id': new ObjectId(deptId) },
    });
  }

  pipeline.push({ $sort: { name: 1 } });

  const cursor = employees.aggregate<EmployeeWithDept>(pipeline);
  return await cursor.toArray();
}

// Get single employee with dept
export async function getEmployeeById(id: string): Promise<EmployeeWithDept | null> {
  if (!ObjectId.isValid(id)) return null;

  const { employees } = await getDb();

  const pipeline: any[] = [
    { $match: { _id: new ObjectId(id) } },
    {
      $lookup: {
        from: 'departments',
        localField: 'departmentId',
        foreignField: '_id',
        as: 'department',
      },
    },
    { $unwind: { path: '$department', preserveNullAndEmptyArrays: true } },
    {
      $project: {
        name: 1,
        position: 1,
        salary: 1,
        departmentId: 1,
        department: {
          _id: 1,
          name: 1,
          floor: 1,
        },
      },
    },
  ];

  const cursor = employees.aggregate<EmployeeWithDept>(pipeline);
  const results = await cursor.toArray();
  return results.length > 0 ? results[0] : null;
}

// Get all departments
export async function getDepartments(): Promise<Department[]> {
  const { departments } = await getDb();
  return await departments.find({}).sort({ name: 1 }).toArray();
}

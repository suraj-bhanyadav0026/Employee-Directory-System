import { MongoClient } from 'mongodb';
import { ObjectId } from 'mongodb';
import type { Department, Employee } from './types';

const MONGODB_URI = 'mongodb://localhost:27017';

async function seed() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    const db = client.db('staffsphere');
    
    // Clear existing data
    await db.collection('departments').deleteMany({});
    await db.collection('employees').deleteMany({});

    // Seed departments
    const departments: Department[] = [
      {
        _id: new ObjectId('507f1f77bcf86cd799439011'),
        name: 'Engineering',
        floor: 5
      },
      {
        _id: new ObjectId('507f1f77bcf86cd799439012'),
        name: 'Design',
        floor: 4
      },
      {
        _id: new ObjectId('507f1f77bcf86cd799439013'),
        name: 'Sales',
        floor: 3
      },
      {
        _id: new ObjectId('507f1f77bcf86cd799439014'),
        name: 'HR',
        floor: 2
      },
      {
        _id: new ObjectId('507f1f77bcf86cd799439015'),
        name: 'Marketing',
        floor: 6
      },
    ];

    await db.collection('departments').insertMany(departments);
    console.log('✅ Seeded departments');

    // Seed employees
    const employees: Employee[] = [
      {
        _id: new ObjectId('507f191e810c19729de860ea'),
        name: 'Sarah Johnson',
        position: 'Senior Frontend Developer',
        salary: 125000,
        departmentId: new ObjectId('507f1f77bcf86cd799439011')
      },
      {
        _id: new ObjectId('507f191e810c19729de860eb'),
        name: 'Mike Chen',
        position: 'Backend Engineer',
        salary: 135000,
        departmentId: new ObjectId('507f1f77bcf86cd799439011')
      },
      {
        _id: new ObjectId('507f191e810c19729de860ec'),
        name: 'Emily Davis',
        position: 'UX/UI Designer',
        salary: 110000,
        departmentId: new ObjectId('507f1f77bcf86cd799439012')
      },
      {
        _id: new ObjectId('507f191e810c19729de860ed'),
        name: 'David Rodriguez',
        position: 'Sales Manager',
        salary: 145000,
        departmentId: new ObjectId('507f1f77bcf86cd799439013')
      },
      {
        _id: new ObjectId('507f191e810c19729de860ee'),
        name: 'Lisa Wang',
        position: 'HR Specialist',
        salary: 95000,
        departmentId: new ObjectId('507f1f77bcf86cd799439014')
      },
      {
        _id: new ObjectId('507f191e810c19729de860ef'),
        name: 'Alex Petrov',
        position: 'Marketing Director',
        salary: 160000,
        departmentId: new ObjectId('507f1f77bcf86cd799439015')
      },
      {
        _id: new ObjectId('507f191e810c19729de860f0'),
        name: 'Rachel Lee',
        position: 'Full Stack Developer',
        salary: 130000,
        departmentId: new ObjectId('507f1f77bcf86cd799439011')
      },
      {
        _id: new ObjectId('507f191e810c19729de860f1'),
        name: 'Tom Wilson',
        position: 'Product Designer',
        salary: 105000,
        departmentId: new ObjectId('507f1f77bcf86cd799439012')
      },
    ];

    await db.collection('employees').insertMany(employees);
    console.log('✅ Seeded 8 employees');

    console.log('🎉 Database seeded successfully!');
    console.log('🔄 Restart dev server: npm run dev');
  } catch (error) {
    console.error('❌ Seed failed:', error);
  } finally {
    await client.close();
  }
}

seed();


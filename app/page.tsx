import { Suspense } from 'react';
import { getEmployees, getDepartments } from '@/lib/db';
import Link from 'next/link';
import { EmployeeCard } from '@/components/EmployeeCard';
import DepartmentFilter from '@/components/DepartmentFilter';

export default async function Page() {
  const [employeesPromise, departmentsPromise] = await Promise.allSettled([
    getEmployees(),
    getDepartments()
  ]);

  const employees = employeesPromise.status === 'fulfilled' ? employeesPromise.value : [];
  const departments = departmentsPromise.status === 'fulfilled' ? departmentsPromise.value : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            StaffSphere
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Modern employee directory with department filtering and detailed profiles
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Suspense fallback={<div>Loading filters...</div>}>
              <DepartmentFilter departments={departments} />
            </Suspense>
          </div>
          
          <div className="lg:col-span-3">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                  Employee Directory ({employees.length})
                </h2>
                <Link
                  href="#add-employee"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  + Add Employee
                </Link>
              </div>

              {employees.length === 0 ? (
                <div className="text-center py-24">
                  <div className="w-24 h-24 bg-gray-100 rounded-3xl mx-auto mb-6 flex items-center justify-center">
                    <span className="text-3xl">👥</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">No employees yet</h3>
                  <p className="text-gray-500 mb-8">Add your first employee to get started.</p>
                  <Link
                    href="#add-employee"
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    Add First Employee
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {employees.map((employee) => (
                    <Suspense key={employee._id?.toString() || ''} fallback={<div>Loading...</div>}>
                      <EmployeeCard employee={employee} />
                    </Suspense>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

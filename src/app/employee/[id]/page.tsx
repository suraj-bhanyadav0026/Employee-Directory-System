import { notFound } from 'next/navigation';
import { getEmployeeById } from '@/lib/db';
import { EmployeeWithDept } from '@/lib/types';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EmployeePage({ params }: Props) {
  const { id } = await params;
  const employee = await getEmployeeById(id);

  if (!employee) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium mb-8 transition-colors"
        >
          ← Back to Directory
        </Link>
        
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/50">
          <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center mb-10">
            <div className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl flex-shrink-0">
              <span className="text-4xl font-bold text-white">
                {employee.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                {employee.name}
              </h1>
              <p className="text-2xl text-indigo-600 font-semibold mb-2">
                {employee.position}
              </p>
              <p className="text-xl text-gray-600 mb-4">
                {employee.department?.name || 'N/A'} • Floor {employee.department?.floor || 'N/A'}
              </p>
              <span className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold text-xl rounded-2xl shadow-xl">
                ${employee.salary.toLocaleString()}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Details</h3>
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="font-medium text-gray-700">Department</dt>
                  <dd className="text-gray-900">{employee.department?.name}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-700">Floor</dt>
                  <dd className="text-gray-900">{employee.department?.floor}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-700">Salary</dt>
                  <dd className="text-gray-900 font-mono">${employee.salary.toLocaleString()}</dd>
                </div>
              </dl>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Location</h3>
              <div className="bg-gradient-to-r from-slate-50 to-indigo-50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full" />
                  <span className="font-semibold text-gray-900">{employee.department?.name}</span>
                </div>
                <div className="space-y-2 text-sm">
                  <p>Floor {employee.department?.floor}</p>
                  <p className="text-indigo-600 font-medium">Employee ID: {employee._id.toString().slice(-6)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


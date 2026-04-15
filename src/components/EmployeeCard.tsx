import Link from 'next/link'
import { cn } from './utils'
import { EmployeeWithDept } from '@/lib/types'

// Employee card for dashboard
export function EmployeeCard({ employee }: { employee: EmployeeWithDept }) {
  return (
    <Link 
      href={`/employee/${employee._id}`}
      className="group bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl border border-white/50 hover:border-indigo-200 transition-all duration-300 hover:-translate-y-2 h-full flex flex-col"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-2xl font-bold text-white">
              {employee.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
              {employee.name}
            </h3>
            <p className="text-indigo-600 font-semibold text-lg mt-1">
              {employee.position}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <span>Department: <span className="font-medium text-gray-900">{employee.department?.name || 'N/A'}</span></span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <div className="w-2 h-2 bg-blue-500 rounded-full" />
          <span>Floor {employee.department?.floor || 'N/A'}</span>
        </div>
      </div>

      <div className="mt-auto pt-6 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent">
            ${employee.salary.toLocaleString()}
          </span>
          <span className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-xl font-medium text-sm shadow-sm">
            View Profile →
          </span>
        </div>
      </div>
    </Link>
  );
}


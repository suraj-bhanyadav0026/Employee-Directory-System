'use client'

import { useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface Department {
  _id: string;
  name: string;
  floor: number;
}

interface Props {
  departments: Department[];
}

export default function DepartmentFilter({ departments }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  
  const currentDept = searchParams.get('department') || '';

  const onFilterChange = (deptId: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      if (deptId) {
        params.set('department', deptId);
      } else {
        params.delete('department');
      }
      router.push(`/?${params.toString()}`);
    });
  };

  return (
    <div className="sticky top-8 space-y-6">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-3">
          <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          Departments
        </h3>
        
        <div className="space-y-2">
          <button
            onClick={() => onFilterChange('')}
            className={cn(
              'w-full text-left px-4 py-3 rounded-xl border-2 font-medium transition-all duration-200 flex items-center gap-3',
              currentDept === '' 
                ? 'border-indigo-500 bg-indigo-50 shadow-md' 
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            )}
            disabled={isPending}
          >
            <span className="w-2 h-2 rounded-full bg-indigo-500 block" />
            All Departments
          </button>
          
          {departments.map((dept) => (
            <button
              key={dept._id}
              onClick={() => onFilterChange(dept._id)}
              className={cn(
                'w-full text-left px-4 py-3 rounded-xl border-2 font-medium transition-all duration-200 flex items-center gap-3',
                currentDept === dept._id
                  ? 'border-indigo-500 bg-indigo-50 shadow-md'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              )}
              disabled={isPending}
            >
              <span className={`w-2 h-2 rounded-full ${
                currentDept === dept._id ? 'bg-indigo-500' : 'bg-gray-300'
              } block`} />
              {dept.name} (Floor {dept.floor})
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}


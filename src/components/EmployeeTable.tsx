
"use client";

import { useState } from 'react';
import { EMPLOYEES } from '@/lib/data';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { RiskBadge } from './ui/RiskBadge';
import { Employee } from '@/lib/types';
import { useRouter } from 'next/navigation';

export const EmployeeTable = () => {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');

  const filteredEmployees = EMPLOYEES.filter((employee) => {
    const matchesSearch = employee.name.toLowerCase().includes(search.toLowerCase()) ||
                          employee.email.toLowerCase().includes(search.toLowerCase());
    const matchesRisk = riskFilter === 'all' || employee.riskLevel === riskFilter;
    return matchesSearch && matchesRisk;
  });

  const handleRowClick = (employee: Employee) => {
    router.push(`/employee/${employee.id}`);
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <Input
          type="text"
          placeholder="Search employees..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <Select
          value={riskFilter}
          onChange={(e) => setRiskFilter(e.target.value)}
        >
          <option value="all">All Risk Levels</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </Select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-secondary">
          <thead className="bg-primary">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Risk Level</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Risk Score</th>
            </tr>
          </thead>
          <tbody className="bg-primary divide-y divide-secondary">
            {filteredEmployees.map((employee) => (
              <tr key={employee.id} onClick={() => handleRowClick(employee)} className="cursor-pointer hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap">{employee.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{employee.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{employee.department}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <RiskBadge level={employee.riskLevel} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{employee.riskScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

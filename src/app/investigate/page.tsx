
import { EMPLOYEES } from '@/lib/data';
import { RiskBadge } from '@/components/ui/RiskBadge';
import Link from 'next/link';

const InvestigationsPage = () => {
  const highRiskEmployees = EMPLOYEES.filter(
    (employee) => employee.riskScore >= 70
  ).sort((a, b) => b.riskScore - a.riskScore);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">High-Risk Employee Investigations</h1>
        <p className="text-text-secondary mb-8">Prioritized list of employees requiring immediate investigation based on their risk profiles.</p>
      <div className="bg-primary rounded-lg shadow-md">
        {highRiskEmployees.length > 0 ? (
            <ul className="divide-y divide-secondary">
              {highRiskEmployees.map((employee) => (
                <li key={employee.id}>
                    <Link href={`/employees/${employee.id}`} className="p-4 flex justify-between items-center hover:bg-secondary transition-colors">
                      <div>
                        <p className="font-semibold">{employee.name}</p>
                        <p className="text-sm text-gray-400">{employee.email}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                            <p className="font-semibold text-sm">Risk Score</p>
                            <p className={`text-xl font-bold ${employee.riskScore > 90 ? 'text-red-500' : (employee.riskScore > 70 ? 'text-yellow-500' : 'text-green-500')}`}>{employee.riskScore}</p>
                        </div>
                        <RiskBadge level={employee.riskLevel} />
                      </div>
                    </Link>
                </li>
              ))}
            </ul>
        ) : (
            <div className="text-center py-12 text-text-secondary">
                <p>No high-risk employees found.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default InvestigationsPage;


import { EMPLOYEES } from '@/lib/data';
import { RiskBadge } from '@/components/ui/RiskBadge';

const InvestigationsPage = () => {
  const highRiskEmployees = EMPLOYEES.filter(
    (employee) => employee.riskLevel === 'high' || employee.riskLevel === 'critical'
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">High-Risk Employees</h1>
      <div className="bg-primary rounded-lg shadow-md">
        <ul className="divide-y divide-secondary">
          {highRiskEmployees.map((employee) => (
            <li key={employee.id} className="p-4 flex justify-between items-center">
              <div>
                <p className="font-semibold">{employee.name}</p>
                <p className="text-sm text-gray-400">{employee.email}</p>
              </div>
              <RiskBadge level={employee.riskLevel} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InvestigationsPage;

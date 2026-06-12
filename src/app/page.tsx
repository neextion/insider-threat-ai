
"use client";
import { Users, AlertTriangle, ShieldCheck, Thermometer } from 'lucide-react';
import { EMPLOYEES, THREAT_EVENTS } from '@/lib/data';
import { MetricCard } from '@/components/ui/MetricCard';
import { DataTable } from '@/components/ui/DataTable';
import { RiskBadge } from '@/components/ui/RiskBadge';
import { Employee } from '@/lib/types';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

const ThreatChart = dynamic(() => import('@/components/ui/ThreatChart'), {
  ssr: false,
});

export default function Home() {
  const router = useRouter();
  const totalEmployees = EMPLOYEES.length;
  const highRiskEmployees = EMPLOYEES.filter(
    e => e.riskLevel === 'high' || e.riskLevel === 'critical'
  ).length;
  const activeAlerts = EMPLOYEES.reduce((acc, e) => acc + e.flags.length, 0);
  const threatScore = Math.round(
    EMPLOYEES.reduce((acc, e) => acc + e.riskScore, 0) / EMPLOYEES.length
  );

  const columns: { accessor: keyof Employee; header: string; cell?: (value: any) => React.ReactNode }[] = [
    { accessor: 'name', header: 'Employee' },
    { accessor: 'riskScore', header: 'Risk Score' },
    {
      accessor: 'riskLevel',
      header: 'Risk Level',
      cell: (value) => <RiskBadge level={value as "low" | "medium" | "high" | "critical"} />,
    },
    { accessor: 'flags', header: 'Flags', cell: (value) => (Array.isArray(value) ? value.length : 0) },
  ];

  const threatEventsByType = THREAT_EVENTS.reduce((acc, event) => {
    const eventType = event.type.replace(/_/g, ' ');
    const existing = acc.find(item => item.name === eventType);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: eventType, value: 1 });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  const threatEventsOverTime = THREAT_EVENTS.reduce((acc, event) => {
    const eventDate = new Date(event.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const existing = acc.find(item => item.name === eventDate);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: eventDate, value: 1 });
    }
    return acc;
  }, [] as { name: string; value: number }[]).sort((a,b) => new Date(a.name).getTime() - new Date(b.name).getTime());

  const handleRowClick = (employee: Employee) => {
    router.push(`/employee/${employee.id}`);
  };

  return (
    <div className="space-y-8">
        <div className="grid grid-cols-4 gap-6 mb-8">
            <MetricCard title="Total Employees" value={totalEmployees} icon={Users} />
            <MetricCard title="High Risk Employees" value={highRiskEmployees} icon={AlertTriangle} variant="danger" />
            <MetricCard title="Active Alerts" value={activeAlerts.toString()} icon={ShieldCheck} variant="warning" />
            <MetricCard title="Avg. Threat Score" value={`${threatScore}%`} icon={Thermometer} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-primary p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Threat Events by Type</h2>
                <ThreatChart data={threatEventsByType} type="pie" />
            </div>
            <div className="bg-primary p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Threat Events Over Time</h2>
                <ThreatChart data={threatEventsOverTime} type="line" />
            </div>
        </div>

        <div>
            <h2 className="text-2xl font-bold mb-4">Employee Risk Overview</h2>
            <DataTable columns={columns} data={EMPLOYEES} onRowClick={handleRowClick} />
        </div>
    </div>
  );
}

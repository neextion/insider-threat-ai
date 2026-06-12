
"use client";

import { EMPLOYEES, THREAT_EVENTS } from "@/lib/data";
import { notFound } from "next/navigation";
import { MetricCard } from "@/components/ui/MetricCard";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { AlertTriangle, ShieldCheck, Thermometer, User, BrainCircuit, Flag } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import dynamic from "next/dynamic";
import { useState } from "react";
import { AnalysisResult } from "@/components/ui/AnalysisResult";
import Image from "next/image";
import { RiskLevel } from "@/lib/types";

const ThreatChart = dynamic(() => import('@/components/ui/ThreatChart'), {
  ssr: false,
});

interface AnalysisData {
    riskSummary: string;
    topFlags: { reason: string; description: string; }[];
    recommendedActions: string[];
    anomalyExplanation: string;
}

const getSeverityColor = (severity: 'high' | 'medium' | 'low') => {
    switch (severity) {
        case 'high':
            return 'bg-red-500/20 text-red-400 border-red-500/30';
        case 'medium':
            return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
        case 'low':
            return 'bg-green-500/20 text-green-400 border-green-500/30';
    }
}

const getRiskLevelFromScore = (score: number): RiskLevel => {
    if (score >= 90) return 'critical';
    if (score >= 70) return 'high';
    if (score >= 40) return 'medium';
    return 'low';
};

export default function EmployeePage({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisData | null>(null);

  const employee = EMPLOYEES.find((e) => e.id === params.id);

  if (!employee) {
    notFound();
  }

  const employeeThreats = THREAT_EVENTS.filter(event => event.employeeId === employee.id);

  const threatEventsOverTime = employeeThreats.reduce((acc, event) => {
    const eventDate = new Date(event.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const existing = acc.find(item => item.name === eventDate);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: eventDate, value: 1 });
    }
    return acc;
  }, [] as { name: string; value: number }[]).sort((a,b) => new Date(a.name).getTime() - new Date(b.name).getTime());

  const handleRunAnalysis = async () => {
    setLoading(true);
    try {
        const response = await fetch("/api/analyze", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ employeeId: employee.id }),
        });

        if (response.ok) {
            const data = await response.json();
            setAnalysisResult(data);
        } else {
            console.error("Failed to run analysis");
        }
    } catch (error) {
        console.error("An error occurred while running the analysis", error);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
        <Breadcrumb />
        <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
                <Image src={employee.avatarUrl} alt={employee.name} width={96} height={96} className="rounded-full" />
                <div>
                    <h1 className="text-4xl font-bold">{employee.name}</h1>
                    <p className="text-lg text-text-secondary">{employee.jobTitle}</p>
                </div>
            </div>
            <button
                onClick={handleRunAnalysis}
                disabled={loading}
                className="bg-accent text-white px-6 py-3 rounded-lg font-semibold flex items-center disabled:bg-opacity-50 hover:bg-accent/90 transition-colors"
            >
                <BrainCircuit className="mr-2 h-5 w-5" />
                {loading ? "Running..." : "Run Analysis"}
            </button>
        </div>

      {analysisResult && <AnalysisResult {...analysisResult} />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard title="Risk Score" value={employee.riskScore} icon={Thermometer} />
        <MetricCard title="Risk Level" value={<RiskBadge level={employee.riskLevel} />} icon={AlertTriangle} variant={employee.riskLevel === 'high' || employee.riskLevel === 'critical' ? 'danger' : 'warning'} />
        <MetricCard title="Total Flags" value={employee.flags.length} icon={ShieldCheck} />
      </div>

      <div className="bg-primary p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Threat Events Over Time</h2>
        <ThreatChart data={threatEventsOverTime} type="line" />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Recent Threat Events</h2>
        <div className="space-y-4">
          {employeeThreats.slice(0, 5).map(event => (
            <div key={event.id} className="bg-primary p-4 rounded-lg shadow-sm flex justify-between items-center">
              <div>
                <p className="font-semibold text-lg">{event.type.replace(/_/g, ' ')}</p>
                <p className="text-sm text-text-secondary">{new Date(event.timestamp).toLocaleString()}</p>
              </div>
              <p className="text-sm font-medium"><RiskBadge level={getRiskLevelFromScore(event.riskScore)} /></p>
            </div>
          ))}
        </div>
      </div>

        <div className="bg-secondary rounded-lg shadow-md">
            <div className="p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center"><Flag className="w-5 h-5 mr-2" /> Threat Flags ({employee.flags.length})</h2>
                <div className="space-y-4">
                    {employee.flags.length > 0 ? (
                        employee.flags.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).map(flag => (
                            <div key={flag.id} className="p-4 rounded-lg border bg-primary hover:bg-secondary border-secondary">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-semibold capitalize text-base">{flag.type.replace(/_/g, ' ')}</h3>
                                        <p className="text-sm text-text-secondary mt-1">{flag.description}</p>
                                    </div>
                                    <div className={`px-2 py-1 text-xs font-semibold rounded-full border ${getSeverityColor(flag.severity)}`}>{flag.severity}</div>
                                </div>
                                <p className="text-xs text-text-secondary mt-3">{new Date(flag.timestamp).toUTCString()}</p>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8 text-text-secondary">
                            <p>No threat flags detected for this employee.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
}

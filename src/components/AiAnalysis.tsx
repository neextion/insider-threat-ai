
"use client";

import { useState } from 'react';
import { EMPLOYEES } from '@/lib/data';
import { Select } from '@/components/ui/Select';
import { AnalysisResult } from '@/components/ui/AnalysisResult';

export const AiAnalysis = () => {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleEmployeeChange = async (employeeId: string) => {
    setSelectedEmployeeId(employeeId);
    if (employeeId) {
      setLoading(true);
      try {
        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ employeeId }),
        });
        const data = await response.json();
        setAnalysis(data);
      } catch (error) {
        console.error('Error fetching analysis:', error);
        setAnalysis({ error: 'Failed to fetch analysis' });
      }
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <Select
          value={selectedEmployeeId || ''}
          onChange={(e) => handleEmployeeChange(e.target.value)}
        >
          <option value="" disabled>
            Select an employee to analyze
          </option>
          {EMPLOYEES.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.name}
            </option>
          ))}
        </Select>
      </div>

      {loading && <p>Loading analysis...</p>}

      {analysis && !loading && <AnalysisResult riskSummary={analysis.summary} topFlags={[]} recommendedActions={analysis.recommendations} anomalyExplanation={''} />}
    </div>
  );
};

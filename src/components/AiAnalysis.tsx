
"use client";

import { useState } from 'react';
import { EMPLOYEES } from '@/lib/data';
import { Select } from '@/components/ui/Select';
import { AnalysisResult } from '@/components/ui/AnalysisResult';

interface AnalysisData {
    riskSummary: string;
    topFlags: { reason: string; description: string; }[];
    recommendedActions: string[];
    anomalyExplanation: string;
    error?: string;
}

export const AiAnalysis = () => {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleEmployeeChange = async (employeeId: string) => {
    setSelectedEmployeeId(employeeId);
    setAnalysis(null);
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
        if (!response.ok) {
            throw new Error('Failed to fetch analysis');
        }
        const data = await response.json();
        setAnalysis(data);
      } catch (error) {
        console.error('Error fetching analysis:', error);
        setAnalysis({ error: 'Failed to fetch analysis. Please try again later.' } as AnalysisData);
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

      {loading && <div className="text-center p-8"><p>Loading analysis...</p></div>}

      {analysis && !loading && (
        analysis.error ? (
          <div className="bg-danger/20 border border-danger/30 text-danger p-4 rounded-lg">
            <p>{analysis.error}</p>
          </div>
        ) : (
          <AnalysisResult {...analysis} />
        )
      )}
    </div>
  );
};

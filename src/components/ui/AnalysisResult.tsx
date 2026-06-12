
interface AnalysisResultProps {
  riskSummary: string;
  topFlags: { reason: string; description: string; }[];
  recommendedActions: string[];
  anomalyExplanation: string;
}

export const AnalysisResult = ({ riskSummary, topFlags, recommendedActions, anomalyExplanation }: AnalysisResultProps) => {
  return (
    <div className="bg-primary rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Analysis Result</h2>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Risk Summary</h3>
        <p className="text-gray-300">{riskSummary}</p>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Top Flags</h3>
        <ul className="list-disc list-inside text-gray-300">
          {topFlags.map((flag, index) => (
            <li key={index}>{flag.reason}: {flag.description}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Recommended Actions</h3>
        <ul className="list-disc list-inside text-gray-300">
          {recommendedActions.map((action, index) => (
            <li key={index}>{action}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Anomaly Explanation</h3>
        <p className="text-gray-300">{anomalyExplanation}</p>
      </div>
    </div>
  );
};

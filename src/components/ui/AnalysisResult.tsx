
import { AlertCircle, CheckCircle, Shield } from "lucide-react";

interface AnalysisResultProps {
    riskSummary: string;
    topFlags: { reason: string; description: string; }[];
    recommendedActions: string[];
    anomalyExplanation: string;
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({ riskSummary, topFlags, recommendedActions, anomalyExplanation }) => {
    return (
        <div className="bg-primary p-6 rounded-lg shadow-md mt-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
                <AlertCircle className="mr-2 text-warning" />
                Risk Analysis
            </h2>
            <p className="text-text-secondary mb-4">{riskSummary}</p>

            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Top Flags</h3>
                <ul className="space-y-2">
                    {topFlags.map((flag, index) => (
                        <li key={index} className="flex items-start">
                            <Shield className="mr-2 mt-1 text-danger" />
                            <div>
                                <p className="font-semibold">{flag.reason}</p>
                                <p className="text-sm text-text-secondary">{flag.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Recommended Actions</h3>
                <ul className="space-y-2">
                    {recommendedActions.map((action, index) => (
                        <li key={index} className="flex items-start">
                            <CheckCircle className="mr-2 mt-1 text-success" />
                            <p>{action}</p>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h3 className="text-xl font-semibold mb-2">Anomaly Explanation</h3>
                <p className="text-text-secondary">{anomalyExplanation}</p>
            </div>
        </div>
    );
};

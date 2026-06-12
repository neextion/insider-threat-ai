
import { ThreatFlag, RiskLevel, ThreatFlagType } from './types';

const WEIGHTS: Record<ThreatFlagType, number> = {
    'data_exfiltration': 30,
    'unauthorized_access': 25,
    'suspicious_behavior': 20,
    'policy_violation': 10,
};

const TIME_DECAY_FACTOR = 0.01; // Controls how quickly the score decreases over time

/**
 * Calculates a risk score based on a list of threat flags.
 * Incorporates a time decay factor, so older flags have less weight.
 * @param flags The list of threat flags for an employee.
 * @returns A risk score between 0 and 100.
 */
export const calculateRiskScore = (flags: ThreatFlag[]): number => {
    let totalScore = 0;
    const now = new Date();

    flags.forEach(flag => {
        const flagDate = new Date(flag.timestamp);
        const daysOld = (now.getTime() - flagDate.getTime()) / (1000 * 3600 * 24);

        const baseScore = WEIGHTS[flag.type] || 0;
        const decay = Math.exp(-TIME_DECAY_FACTOR * daysOld);
        const decayedScore = baseScore * decay;

        totalScore += decayedScore;
    });

    // The score is capped at 100
    return Math.min(Math.round(totalScore), 100);
};

/**
 * Determines the risk level based on a numerical score.
 * @param score The risk score.
 * @returns The corresponding risk level.
 */
export const getRiskLevel = (score: number): RiskLevel => {
    if (score >= 75) {
        return 'critical';
    }
    if (score >= 50) {
        return 'high';
    }
    if (score >= 25) {
        return 'medium';
    }
    return 'low';
};

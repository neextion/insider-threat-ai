
export type RiskLevel = 'critical' | 'high' | 'medium' | 'low';

export type ThreatFlagType = 
    | 'data_exfiltration'
    | 'unauthorized_access'
    | 'suspicious_behavior'
    | 'policy_violation';

export interface ThreatFlag {
    id: string;
    type: ThreatFlagType;
    description: string;
    timestamp: string;
    severity: 'high' | 'medium' | 'low';
}

export interface Employee {
    id: string;
    name: string;
    email: string;
    department: string;
    jobTitle: string;
    hireDate: string;
    riskScore: number; // 0-100
    riskLevel: RiskLevel;
    lastActivityAt: string;
    flags: ThreatFlag[];
    avatarUrl: string;
}

export interface ThreatEvent {
    id: string;
    employeeId: string;
    timestamp: string;
    type: string;
    description: string;
    riskScore: number;
}

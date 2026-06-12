
import { faker } from '@faker-js/faker';
import { Employee, ThreatFlag, RiskLevel, ThreatFlagType, ThreatEvent } from './types';

faker.seed(123);

const RISK_LEVELS: RiskLevel[] = ['critical', 'high', 'medium', 'low'];
const THREAT_FLAG_TYPES: ThreatFlagType[] = ['data_exfiltration', 'unauthorized_access', 'suspicious_behavior', 'policy_violation'];

const SEVERITY_LEVELS: ('high' | 'medium' | 'low')[] = ['high', 'medium', 'low'];

function createRandomThreatFlag(): ThreatFlag {
    return {
        id: faker.string.uuid(),
        type: faker.helpers.arrayElement(THREAT_FLAG_TYPES),
        description: faker.lorem.sentence(),
        timestamp: faker.date.recent().toISOString(),
        severity: faker.helpers.arrayElement(SEVERITY_LEVELS)
    };
}

function createRandomEmployee(): Employee {
    const riskScore = faker.number.int({ min: 0, max: 100 });
    let riskLevel: RiskLevel;

    if (riskScore > 90) riskLevel = 'critical';
    else if (riskScore > 70) riskLevel = 'high';
    else if (riskScore > 40) riskLevel = 'medium';
    else riskLevel = 'low';

    return {
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        department: faker.person.jobArea(),
        jobTitle: faker.person.jobTitle(),
        hireDate: faker.date.past().toISOString(),
        riskScore: riskScore,
        riskLevel: riskLevel,
        lastActivityAt: faker.date.recent().toISOString(),
        flags: Array.from({ length: faker.number.int({ min: 0, max: 5 }) }, createRandomThreatFlag),
        avatarUrl: faker.image.avatar(),
    };
}

export const EMPLOYEES: Employee[] = Array.from({ length: 500 }, createRandomEmployee);

export const THREAT_EVENTS: ThreatEvent[] = EMPLOYEES.flatMap(employee => 
    employee.flags.map(flag => ({
        id: faker.string.uuid(),
        employeeId: employee.id,
        timestamp: flag.timestamp,
        type: flag.type,
        description: flag.description,
        riskScore: employee.riskScore,
    }))
);


import { NextResponse } from 'next/server';
import { EMPLOYEES } from '@/lib/data';
import { faker } from '@faker-js/faker';

export async function POST(request: Request) {
  try {
    const { employeeId } = await request.json();

    if (!employeeId) {
      return NextResponse.json({ error: 'Employee ID is required' }, { status: 400 });
    }

    const employee = EMPLOYEES.find((emp) => emp.id === employeeId);

    if (!employee) {
      return NextResponse.json({ error: 'Employee not found' }, { status: 404 });
    }

    // Mock AI analysis
    const analysis = {
      riskSummary: `Based on recent activity, ${employee.name} exhibits a ${employee.riskLevel} risk profile. Key factors include ${employee.flags.length} recent threat flags, with the most severe being of type '${employee.flags[0]?.type.replace(/_/g, ' ') || 'N/A'}'. The risk score of ${employee.riskScore} is primarily driven by suspicious patterns in data access and network communication.`,
      topFlags: employee.flags.slice(0, 3).map(flag => ({ reason: flag.type.replace(/_/g, ' '), description: flag.description })),
      recommendedActions: [
        `Immediate review of flags associated with ${employee.name}.`,
        'Consider a temporary restriction of access to sensitive data pending investigation.',
        `Schedule a security awareness briefing with ${employee.name} to reinforce company policies.`,
      ],
      anomalyExplanation: `The spike in data access requests on ${faker.date.recent().toLocaleDateString()} is anomalous compared to the baseline behavior of this user and their peers.`
    };

    return NextResponse.json(analysis);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

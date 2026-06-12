
import { NextResponse } from "next/server";
import { z } from "zod";
import { EMPLOYEES } from "@/lib/data";

const requestSchema = z.object({
  employeeId: z.string(),
});

export async function POST(request: Request) {
  const json = await request.json();
  const parsed = requestSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const { employeeId } = parsed.data;
  const employee = EMPLOYEES.find((e) => e.id === employeeId);

  if (!employee) {
    return NextResponse.json({ error: "Employee not found" }, { status: 404 });
  }

  // This is a placeholder for a real AI-powered risk analysis.
  // In a real application, you would use a more sophisticated model to generate this data.
  const riskSummary = `Based on our analysis, ${employee.name} presents a ${employee.riskLevel} risk of being an insider threat. This assessment is based on a risk score of ${employee.riskScore} and the following key factors: recent unusual file access, after-hours activity, and multiple failed login attempts.`;

  const topFlags = employee.flags.map(flag => ({
    ...flag,
    description: `This flag was triggered on ${new Date(flag.timestamp).toLocaleString()} due to ${flag.description}.`
  }));

  const recommendedActions = [
    "Review recent file access logs for sensitive documents.",
    "Monitor for further unusual account activity, especially outside of normal working hours.",
    "Schedule a meeting with the employee to discuss recent activity and security best practices.",
  ];

  const anomalyExplanation = "The anomaly detection system identified a spike in file downloads and access to confidential project folders, which deviates from the employee's normal behavior patterns. This, combined with login attempts at unusual times, suggests a potential security concern.";

  return NextResponse.json({
    riskSummary,
    topFlags,
    recommendedActions,
    anomalyExplanation,
  });
}


import { RiskLevel } from '@/lib/types';

const riskLevelClasses = {
  low: 'bg-low/20 text-low border-low/30',
  medium: 'bg-medium/20 text-medium border-medium/30',
  high: 'bg-high/20 text-high border-high/30',
  critical: 'bg-critical/20 text-critical border-critical/30',
};

type RiskBadgeProps = {
  level: RiskLevel;
};

export const RiskBadge = ({ level }: RiskBadgeProps) => {
  const badgeClasses = `px-3 py-1 text-xs font-semibold rounded-full border ${riskLevelClasses[level]}`;
  return <span className={badgeClasses}>{level.charAt(0).toUpperCase() + level.slice(1)}</span>;
};

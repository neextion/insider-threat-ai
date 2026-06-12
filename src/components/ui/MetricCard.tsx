
import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

type MetricCardProps = {
  title: string;
  value: ReactNode;
  icon: LucideIcon;
  variant?: 'default' | 'danger' | 'warning';
};

const variantIconClasses = {
    default: {
        iconContainer: 'bg-accent/10 text-accent',
        icon: 'text-accent',
    },
    danger: {
        iconContainer: 'bg-danger/10',
        icon: 'text-danger',
    },
    warning: {
        iconContainer: 'bg-warning/10',
        icon: 'text-warning',
    },
};


const getCardStyle = (variant: 'default' | 'danger' | 'warning') => {
    switch (variant) {
      case 'danger':
        return { backgroundColor: '#2d1515', border: '1px solid #5c2020' };
      case 'warning':
        return { backgroundColor: '#2d2510', border: '1px solid #5c4a10' };
      default:
        return { backgroundColor: '#1e2130', border: '1px solid #2a2f45' };
    }
};

export const MetricCard = ({ title, value, icon: Icon, variant = 'default' }: MetricCardProps) => {
  const iconStyles = variantIconClasses[variant];
  const cardStyle = getCardStyle(variant);

  return (
    <div className="flex flex-col justify-between p-6 rounded-lg shadow-lg" style={cardStyle}>
      <div className="flex justify-between items-start">
        <p className="text-sm font-medium text-text-secondary">{title}</p>
        <div className={`p-2 rounded-full ${iconStyles.iconContainer}`}>
          <Icon className={`w-6 h-6 ${iconStyles.icon}`} />
        </div>
      </div>
      <div>
        <div className="text-3xl font-bold mt-2 text-text">{value}</div>
      </div>
    </div>
  );
};

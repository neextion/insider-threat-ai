
"use client";

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

type ChartData = {
  name: string;
  value: number;
};

type ThreatChartProps = {
  data: ChartData[];
  type: 'pie' | 'line';
};

const COLORS = ['#0A84FF', '#34C759', '#FF9500', '#FF3B30', '#5856D6', '#5AC8FA'];

const ThreatChart = ({ data, type }: ThreatChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      {type === 'pie' ? (
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ backgroundColor: '#2C2C2E', border: '1px solid #3A3A3C', borderRadius: '0.5rem' }} />
          <Legend formatter={(value) => <span className="text-text">{value}</span>} />
        </PieChart>
      ) : (
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#3A3A3C" />
          <XAxis dataKey="name" stroke="#8E8E93" />
          <YAxis stroke="#8E8E93" />
          <Tooltip contentStyle={{ backgroundColor: '#2C2C2E', border: '1px solid #3A3A3C', borderRadius: '0.5rem' }} />
          <Legend formatter={(value) => <span className="text-text">{value}</span>} />
          <Line type="monotone" dataKey="value" stroke="#0A84FF" strokeWidth={2} />
        </LineChart>
      )}
    </ResponsiveContainer>
  );
};

export default ThreatChart;

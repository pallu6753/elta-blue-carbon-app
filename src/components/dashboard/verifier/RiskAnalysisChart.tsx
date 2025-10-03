'use client';
import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const riskData = [
  { name: 'Inconsistent Data', value: 4, color: 'hsl(var(--chart-1))' },
  { name: 'Anomalous Readings', value: 2, color: 'hsl(var(--chart-2))' },
  { name: 'Missing Documentation', value: 3, color: 'hsl(var(--chart-3))'  },
  { name: 'Boundary Mismatch', value: 1, color: 'hsl(var(--chart-4))'  },
];

export default function RiskAnalysisChart() {
  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip
             contentStyle={{
              background: 'hsl(var(--background))',
              borderColor: 'hsl(var(--border))',
            }}
            labelStyle={{ color: 'hsl(var(--foreground))' }}
          />
          <Pie
            data={riskData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            stroke="hsl(var(--border))"
          >
            {riskData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

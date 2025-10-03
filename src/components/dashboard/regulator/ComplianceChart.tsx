'use client';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const complianceData = [
  { name: 'Data Transparency', score: 92, fill: 'hsl(var(--chart-1))' },
  { name: 'MRV Adherence', score: 85, fill: 'hsl(var(--chart-2))'  },
  { name: 'Audit Trail', score: 95, fill: 'hsl(var(--chart-3))'  },
  { name: 'Tokenomics', score: 78, fill: 'hsl(var(--chart-4))'  },
];

export default function ComplianceChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
            data={complianceData} 
            layout="vertical" 
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <XAxis 
            type="number" 
            domain={[0, 100]} 
            stroke="hsl(var(--muted-foreground))" 
            fontSize={12} 
            tickFormatter={(value) => `${value}%`}
          />
          <YAxis 
            type="category" 
            dataKey="name" 
            stroke="hsl(var(--muted-foreground))" 
            fontSize={12} 
            width={120} 
            tickLine={false} 
            axisLine={false}
          />
          <Tooltip
            cursor={{ fill: 'hsl(var(--muted))' }}
            contentStyle={{
              background: 'hsl(var(--background))',
              borderColor: 'hsl(var(--border))',
            }}
            labelStyle={{ color: 'hsl(var(--foreground))' }}
            formatter={(value: number) => [`${value}%`, 'Compliance Score']}
          />
          <Bar dataKey="score" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

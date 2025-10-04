'use client';
import { Pie, PieChart, ResponsiveContainer, Cell, Legend } from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';

const riskData = [
  { name: 'Inconsistent Data', value: 4, fill: 'hsl(var(--chart-1))' },
  { name: 'Anomalous Readings', value: 2, fill: 'hsl(var(--chart-2))' },
  { name: 'Missing Documentation', value: 3, fill: 'hsl(var(--chart-3))' },
  { name: 'Boundary Mismatch', value: 1, fill: 'hsl(var(--chart-4))' },
];

const chartConfig = {
  value: {
    label: 'Items',
  },
  'Inconsistent Data': {
    label: 'Inconsistent Data',
    color: 'hsl(var(--chart-1))',
  },
  'Anomalous Readings': {
    label: 'Anomalous Readings',
    color: 'hsl(var(--chart-2))',
  },
  'Missing Documentation': {
    label: 'Missing Documentation',
    color: 'hsl(var(--chart-3))',
  },
  'Boundary Mismatch': {
    label: 'Boundary Mismatch',
    color: 'hsl(var(--chart-4))',
  },
};

export default function RiskAnalysisChart() {
  return (
    <div className="h-[250px] w-full flex justify-center">
      <ChartContainer config={chartConfig}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={riskData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              innerRadius={60}
              strokeWidth={5}
            >
               {riskData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="name" />}
              className="-mt-4"
            />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}

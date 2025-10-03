'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, AlertTriangle, Gavel } from 'lucide-react';

const widgets = [
    { title: 'Total Active Projects', value: '8', icon: Globe, subtext: 'Across all regions', borderColor: 'border-indigo-500', valueColor: 'text-indigo-600' },
    { title: 'Pending Approvals', value: '2', icon: AlertTriangle, subtext: 'Awaiting policy review', borderColor: 'border-yellow-500', valueColor: 'text-yellow-600' },
    { title: 'High-Risk Project', value: '1', icon: Gavel, subtext: 'Requires audit', borderColor: 'border-red-500', valueColor: 'text-red-600' },
];

export default function RegulatorDashboard() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">Regulator Oversight</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {widgets.map(widget => (
            <Card key={widget.title} className={`shadow-lg border-l-4 ${widget.borderColor}`}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm uppercase font-medium text-gray-600">{widget.title}</CardTitle>
                    <widget.icon className="h-6 w-6 text-gray-400" />
                </CardHeader>
                <CardContent>
                    <div className={`text-4xl font-extrabold ${widget.valueColor}`}>{widget.value}</div>
                    <p className="text-xs text-muted-foreground">{widget.subtext}</p>
                </CardContent>
            </Card>
        ))}
      </div>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Ecosystem Policy Compliance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-50 flex items-center justify-center text-gray-400 border border-dashed rounded-lg">
              Compliance Scorecard (Simulated)
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

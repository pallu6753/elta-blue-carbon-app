'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClipboardList, CheckCircle, CircleX } from 'lucide-react';

const widgets = [
    { title: 'Reports to Review', value: '3', icon: ClipboardList, subtext: 'Awaiting your verification', borderColor: 'border-yellow-500', valueColor: 'text-yellow-600' },
    { title: 'Reports Approved', value: '1', icon: CheckCircle, subtext: 'In the last 30 days', borderColor: 'border-green-500', valueColor: 'text-green-600' },
    { title: 'Reports Rejected', value: '0', icon: CircleX, subtext: 'In the last 30 days', borderColor: 'border-red-500', valueColor: 'text-red-600' },
];

export default function VerifierDashboard() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">Verifier Overview</h2>
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
    </div>
  );
}

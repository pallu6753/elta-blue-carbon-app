'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Globe, AlertTriangle, Gavel, FileCheck2, Clock } from 'lucide-react';
import ComplianceChart from './ComplianceChart';
import { Table, TableBody, TableCell, TableRow, TableHead, TableHeader } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const widgets = [
    { title: 'Total Active Projects', value: '8', icon: Globe, subtext: 'Across all regions', borderColor: 'border-indigo-500', valueColor: 'text-indigo-600' },
    { title: 'Pending Approvals', value: '2', icon: AlertTriangle, subtext: 'Awaiting policy review', borderColor: 'border-yellow-500', valueColor: 'text-yellow-600' },
    { title: 'High-Risk Project', value: '1', icon: Gavel, subtext: 'Requires audit', borderColor: 'border-red-500', valueColor: 'text-red-600' },
];

const recentReviews = [
    { policy: 'MRV Data Integrity v2.1', status: 'Approved', icon: FileCheck2 },
    { policy: 'Token Issuance Protocol', status: 'Pending', icon: Clock },
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Ecosystem Policy Compliance</CardTitle>
            <CardDescription>Overall compliance scores by policy area.</CardDescription>
          </CardHeader>
          <CardContent>
            <ComplianceChart />
          </CardContent>
        </Card>
         <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Recent Policy Reviews</CardTitle>
            <CardDescription>Status of recently reviewed governance policies.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
                <TableBody>
                    {recentReviews.map(review => (
                        <TableRow key={review.policy}>
                            <TableCell className="font-medium flex items-center gap-3">
                                <review.icon className={`h-5 w-5 ${review.status === 'Approved' ? 'text-green-500' : 'text-yellow-500'}`} />
                                {review.policy}
                            </TableCell>
                            <TableCell className="text-right">
                                <Badge variant={review.status === 'Approved' ? 'default' : 'secondary' } className={review.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800' }>{review.status}</Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

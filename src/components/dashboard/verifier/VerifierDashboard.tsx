'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ClipboardList, CheckCircle, CircleX, FileWarning } from 'lucide-react';
import RiskAnalysisChart from './RiskAnalysisChart';
import { Table, TableBody, TableCell, TableRow, TableHead, TableHeader } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';


const widgets = [
    { title: 'Reports to Review', value: '3', icon: ClipboardList, subtext: 'Awaiting your verification', borderColor: 'border-yellow-500', valueColor: 'text-yellow-500' },
    { title: 'Reports Approved', value: '1', icon: CheckCircle, subtext: 'In the last 30 days', borderColor: 'border-green-500', valueColor: 'text-green-500' },
    { title: 'Reports Rejected', value: '0', icon: CircleX, subtext: 'In the last 30 days', borderColor: 'border-red-500', valueColor: 'text-red-500' },
];

const reportsToReview = [
  { name: 'Sunderbans Mangrove - Q3 Report', developer: 'Alice Developer', risk: 'Low' },
  { name: 'Mahanadi Seagrass - Initial Baseline', developer: 'Alice Developer', risk: 'Medium' },
  { name: 'Ocean Reef Project - Annual Audit', developer: 'Global Ocean Fund', risk: 'High' },
];

export default function VerifierDashboard() {
  const { toast } = useToast();

  const handleReview = () => {
    toast({
      title: "Review Action",
      description: "In a real app, this would open the full MRV report for verification.",
    })
  }

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-foreground">Verifier Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {widgets.map(widget => (
            <Card key={widget.title} className={`shadow-lg border-l-4 ${widget.borderColor}`}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm uppercase font-medium text-muted-foreground">{widget.title}</CardTitle>
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
            <CardTitle>Reports Awaiting Verification</CardTitle>
            <CardDescription>Projects that require your immediate attention.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project Report</TableHead>
                  <TableHead>Developer</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reportsToReview.map(report => (
                  <TableRow key={report.name}>
                    <TableCell className="font-medium">{report.name}</TableCell>
                    <TableCell>{report.developer}</TableCell>
                    <TableCell>
                      <Badge variant={report.risk === 'Low' ? 'default' : report.risk === 'Medium' ? 'secondary' : 'destructive'} className={report.risk === 'Low' ? 'bg-blue-100 text-blue-800' : report.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}>{report.risk}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" onClick={handleReview}>Review Report</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

      <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><FileWarning className="h-5 w-5 text-yellow-500" /> AI-Flagged Risk Analysis</CardTitle>
            <CardDescription>AI has identified potential risks in submitted MRV data across all active projects.</CardDescription>
          </CardHeader>
          <CardContent>
              <RiskAnalysisChart />
          </CardContent>
      </Card>
    </div>
  );
}

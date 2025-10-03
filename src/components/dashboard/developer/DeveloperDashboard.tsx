'use client';
import React, { useContext } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, FileText, DollarSign, Plus } from 'lucide-react';
import { AppContext, AppContextType } from '@/context/AppProvider';
import CreditIssuanceChart from './CreditIssuanceChart';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const widgets = [
    { title: 'My Projects', value: '3', icon: Briefcase, subtext: '2 active projects' },
    { title: 'MRV Reports Submitted', value: '4', icon: FileText, subtext: '3 pending verification', valueColor: 'text-red-500' },
    { title: 'Total Credits Issued (tCO₂e)', value: '4,800', icon: DollarSign, subtext: 'From all approved reports' },
];

const recentProjects = [
    { name: 'Sunderbans Mangrove Restoration', target: '15,000 tCO₂e target', status: 'Active' },
    { name: 'Mahanadi Delta Seagrass Project', target: '8,000 tCO₂e target', status: 'Active' },
]

export default function DeveloperDashboard() {
  const { setNewProjectModalOpen } = useContext(AppContext) as AppContextType;
  return (
    <div className="space-y-8">
        <h2 className="text-3xl font-bold text-gray-800">Developer Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {widgets.map(widget => (
                <Card key={widget.title} className="shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm uppercase font-medium text-gray-600">{widget.title}</CardTitle>
                        <widget.icon className="h-6 w-6 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className={`text-4xl font-extrabold text-blue-carbon ${widget.valueColor}`}>{widget.value}</div>
                        <p className="text-xs text-muted-foreground">{widget.subtext}</p>
                    </CardContent>
                </Card>
            ))}
        </div>

        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle>Credit Issuance Overview</CardTitle>
            </CardHeader>
            <CardContent>
                <CreditIssuanceChart />
                 <p className="text-xs text-gray-500 mt-2 text-center">Total carbon credits issued per month (Simulated)</p>
            </CardContent>
        </Card>

        <Card className="shadow-lg">
            <CardHeader className="flex-row items-center justify-between">
                <CardTitle>Recent Projects</CardTitle>
                <Button onClick={() => setNewProjectModalOpen(true)} size="sm">
                    <Plus className="h-4 w-4 mr-1" /> New Project
                </Button>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableBody>
                        {recentProjects.map(project => (
                            <TableRow key={project.name}>
                                <TableCell className="font-medium">
                                    {project.name}
                                    <p className="text-xs text-muted-foreground">{project.target}</p>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Badge variant={project.status === 'Active' ? 'default' : 'secondary' } className="bg-green-100 text-green-800">{project.status}</Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  );
}

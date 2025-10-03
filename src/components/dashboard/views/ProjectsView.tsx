'use client';
import React, { useContext } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, FileText, Settings } from 'lucide-react';
import { AppContext, AppContextType } from '@/context/AppProvider';

const projects = [
    { name: 'Sunderbans Mangrove Restoration', credits: '4,800 tCO₂e', status: 'Active', mrvStatus: 'Approved' },
    { name: 'Mahanadi Delta Seagrass Project', credits: '0 tCO₂e', status: 'Active', mrvStatus: 'Pending' },
    { name: 'Chilika Lake Conservation', credits: '0 tCO₂e', status: 'Pending', mrvStatus: 'Not Submitted' },
];

export default function ProjectsView() {
  const { setNewProjectModalOpen, setActiveView } = useContext(AppContext) as AppContextType;

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <div>
            <CardTitle className="text-3xl font-bold text-foreground">Project Management</CardTitle>
            <CardDescription>Manage your portfolio of blue carbon projects.</CardDescription>
          </div>
           <Button onClick={() => setNewProjectModalOpen(true)} size="sm">
              <Plus className="h-4 w-4 mr-1" /> New Project
            </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Project Name</TableHead>
                    <TableHead>Total Credits Issued</TableHead>
                    <TableHead>Project Status</TableHead>
                    <TableHead>Latest MRV Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {projects.map(project => (
                    <TableRow key={project.name}>
                        <TableCell className="font-medium">{project.name}</TableCell>
                        <TableCell>{project.credits}</TableCell>
                        <TableCell>
                            <Badge variant={project.status === 'Active' ? 'default' : 'secondary'} className={project.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>{project.status}</Badge>
                        </TableCell>
                        <TableCell>
                             <Badge variant={project.mrvStatus === 'Approved' ? 'default' : (project.mrvStatus === 'Pending' ? 'secondary' : 'outline')} className={project.mrvStatus === 'Approved' ? 'bg-blue-100 text-blue-800' : (project.mrvStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800')}>{project.mrvStatus}</Badge>
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                           <Button variant="outline" size="sm" onClick={() => setActiveView('mrv')}>
                                <FileText className="h-4 w-4 mr-1" />
                                MRV
                            </Button>
                             <Button variant="ghost" size="icon">
                                <Settings className="h-4 w-4" />
                            </Button>
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

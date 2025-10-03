'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const projectData = [
    { name: "Sunderbans Mangrove Restoration", developer: "Alice Developer", status: "Active", coords: [21.94, 89.18], credits: "4,800 tCO₂e" },
    { name: "Mahanadi Delta Seagrass Project", developer: "Alice Developer", status: "Active", coords: [20.35, 86.42], credits: "0 tCO₂e" },
    { name: "Amazon Coral Reef Protection", developer: "Global Ocean Fund", status: "Pending", coords: [-1.5, -48.0], credits: "0 tCO₂e" },
    { name: "Andaman Islands Seagrass Meadow", developer: "SeaGrass Guardians", status: "Active", coords: [12.5, 92.8], credits: "1,200 tCO₂e" },
    { name: "Gulf of Mannar Biosphere", developer: "Coastal Conservation Group", status: "Pending", coords: [9.0, 79.0], credits: "0 tCO₂e" },
];

export default function MapView() {
  const { toast } = useToast();

  const handleZoom = () => {
    toast({
        title: "Map Action",
        description: "In a real implementation, this would zoom to the project's location on the map.",
    });
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-foreground">Ecosystem Project Map</CardTitle>
          <CardDescription>Geographical distribution of all blue carbon projects.</CardDescription>
        </CardHeader>
        <CardContent>
          <div id="map-container" className="h-[480px] w-full rounded-lg bg-muted/50 flex items-center justify-center border border-dashed">
            <p className="text-muted-foreground">Interactive Map Placeholder</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle>All Projects on Platform</CardTitle>
            <CardDescription>A comprehensive list of all projects registered on the platform.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Project</TableHead>
                        <TableHead>Developer</TableHead>
                        <TableHead>Credits Issued</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {projectData.map(project => (
                        <TableRow key={project.name}>
                            <TableCell className="font-medium">{project.name}</TableCell>
                            <TableCell>{project.developer}</TableCell>
                            <TableCell>{project.credits}</TableCell>
                            <TableCell>
                               <Badge variant={project.status === 'Active' ? 'default' : 'secondary'} className={project.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'}>{project.status}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="sm" onClick={handleZoom}>
                                    <MapPin className="h-4 w-4 mr-1" />
                                    View on Map
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

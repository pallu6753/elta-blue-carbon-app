'use client';
import React, { useContext, useState } from 'react';
import { AppContext, AppContextType } from '@/context/AppProvider';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PlusCircle, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function NewProjectModal() {
  const { isNewProjectModalOpen, setNewProjectModalOpen } = useContext(AppContext) as AppContextType;
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const projectName = formData.get('project-name');
    
    // In a real app, this would be saved to a database.
    console.log("New Project Submitted:", {
      name: projectName,
      type: formData.get('project-type'),
      location: formData.get('project-location'),
      target: formData.get('project-target'),
    });

    setNewProjectModalOpen(false);
    toast({
      title: 'Project Registration Initiated',
      description: `Project "${projectName}" is now pending initial documentation.`,
    });
  };

  return (
    <Dialog open={isNewProjectModalOpen} onOpenChange={setNewProjectModalOpen}>
      <DialogContent className="sm:max-w-md p-0 gap-0">
        <DialogHeader className="p-4 border-b">
          <DialogTitle className="flex items-center text-blue-carbon">
            <PlusCircle className="h-6 w-6 mr-2 text-primary" />
            Create New Project
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div>
              <Label htmlFor="project-name">Project Name</Label>
              <Input id="project-name" name="project-name" required />
            </div>
            <div>
              <Label htmlFor="project-type">Project Type</Label>
              <Select name="project-type" required>
                <SelectTrigger id="project-type">
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mangrove Restoration">Mangrove Restoration</SelectItem>
                  <SelectItem value="Seagrass Conservation">Seagrass Conservation</SelectItem>
                  <SelectItem value="Salt Marsh Management">Salt Marsh Management</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="project-location">Location (Coordinates or Area)</Label>
              <Input id="project-location" name="project-location" placeholder="e.g., Sunderbans Region" required />
            </div>
            <div>
              <Label htmlFor="project-target">Estimated tCO₂e Target</Label>
              <Input id="project-target" name="project-target" type="number" min="100" required />
            </div>
          </div>
          <DialogFooter className="p-4 border-t">
            <Button type="submit" className="bg-blue-carbon hover:bg-blue-carbon/90">
              <Save className="h-4 w-4 mr-2" /> Register Project
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

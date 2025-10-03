'use client';
import React, { useContext } from 'react';
import { AppContext, AppContextType } from '@/context/AppProvider';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import MobileSidebar from './MobileSidebar';
import { Menu } from 'lucide-react';

export default function Header() {
  const { role, activeView, setAssistantModalOpen } = useContext(AppContext) as AppContextType;

  const getPageTitle = () => {
    if (activeView === 'dashboard') return 'Dashboard';
    if (activeView === 'projects') return 'Projects';
    if (activeView === 'mrv') return 'MRV/Reports';
    if (activeView === 'marketplace') return 'Marketplace';
    if (activeView === 'map') return 'Ecosystem Map';
    return 'Dashboard';
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64">
                <MobileSidebar />
              </SheetContent>
            </Sheet>
          </div>
          <h1 className="text-xl font-extrabold text-gray-800 tracking-tight capitalize">
            {getPageTitle()}
          </h1>
          <span className="hidden sm:inline-block text-sm font-semibold text-gray-600 px-3 py-1 bg-gray-100 rounded-full">
            {role} View
          </span>
        </div>

        <div className="flex items-center space-x-6">
          <Button
            onClick={() => setAssistantModalOpen(true)}
            className="bg-accent hover:bg-accent/90"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            AI Expert
          </Button>
        </div>
      </div>
    </header>
  );
}

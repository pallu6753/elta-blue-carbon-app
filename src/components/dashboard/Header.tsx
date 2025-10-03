'use client';
import React, { useContext } from 'react';
import { AppContext, AppContextType } from '@/context/AppProvider';
import { Button } from '@/components/ui/button';
import { Sparkles, Menu, Sun, Moon } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import MobileSidebar from './MobileSidebar';
import { useTheme } from '@/context/ThemeProvider';

export default function Header() {
  const { role, activeView, setAssistantModalOpen } = useContext(AppContext) as AppContextType;
  const { theme, setTheme } = useTheme();

  const getPageTitle = () => {
    if (activeView === 'dashboard') return 'Dashboard';
    if (activeView === 'projects') return 'Projects';
    if (activeView === 'mrv') return 'MRV/Reports';
    if (activeView === 'marketplace') return 'Marketplace';
    if (activeView === 'map') return 'Ecosystem Map';
    return 'Dashboard';
  };

  return (
    <header className="bg-background/80 backdrop-blur-sm shadow-md sticky top-0 z-30">
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
          <h1 className="text-xl font-extrabold text-foreground tracking-tight capitalize">
            {getPageTitle()}
          </h1>
          <span className="hidden sm:inline-block text-sm font-semibold text-muted-foreground px-3 py-1 bg-muted rounded-full">
            {role} View
          </span>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          <Button
            onClick={() => setAssistantModalOpen(true)}
            className="bg-accent hover:bg-accent/90"
          >
            <Sparkles className="h-4 w-4 mr-0 sm:mr-2" />
            <span className="hidden sm:inline">AI Expert</span>
          </Button>
        </div>
      </div>
    </header>
  );
}

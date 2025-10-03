'use client';
import React, { useContext } from 'react';
import Link from 'next/link';
import {
  Waves,
  LayoutDashboard,
  HardHat,
  CheckSquare,
  Landmark,
  MapPin,
  Sparkles,
  LogOut,
} from 'lucide-react';
import { AppContext, AppContextType } from '@/context/AppProvider';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const navItems = [
  { view: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', roles: ['Project Developer', 'Verifier', 'Investor', 'Regulator'] },
  { view: 'projects', icon: HardHat, label: 'Projects', roles: ['Project Developer', 'Verifier', 'Regulator'] },
  { view: 'mrv', icon: CheckSquare, label: 'MRV/Reports', roles: ['Project Developer', 'Verifier'] },
  { view: 'marketplace', icon: Landmark, label: 'Marketplace', roles: ['Investor'] },
  { view: 'map', icon: MapPin, label: 'Map View', roles: ['Project Developer', 'Verifier', 'Investor', 'Regulator'] },
];

const NavItem = ({ item }: { item: (typeof navItems)[0] }) => {
  const { activeView, setActiveView } = useContext(AppContext) as AppContextType;
  const isActive = activeView === item.view;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setActiveView(item.view);
          }}
          className={cn(
            'flex items-center justify-center w-full h-16 text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-blue-carbon relative',
            isActive && 'bg-emerald-50 text-primary'
          )}
        >
          {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>}
          <item.icon className="h-6 w-6" />
        </a>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>{item.label}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default function Sidebar() {
  const { role, logout, setAssistantModalOpen } = useContext(AppContext) as AppContextType;

  const filteredNavItems = navItems.filter(item => item.roles.includes(role!));

  return (
    <aside className="hidden md:flex flex-col w-16 bg-white shadow-xl fixed top-0 left-0 h-full z-40">
       <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/"
              onClick={logout}
              className="h-16 flex items-center justify-center border-b hover:bg-gray-100 transition-colors duration-200"
              aria-label="Homepage"
            >
              <Waves className="text-blue-carbon h-7 w-7" />
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Homepage</p>
          </TooltipContent>
        </Tooltip>
        <nav className="flex flex-col flex-grow">
          {filteredNavItems.map((item) => (
            <NavItem key={item.view} item={item} />
          ))}
        </nav>
        <div className="mt-auto py-2 border-t">
           <Tooltip>
            <TooltipTrigger asChild>
                <a
                href="#"
                onClick={(e) => { e.preventDefault(); setAssistantModalOpen(true); }}
                className="flex items-center justify-center w-full h-16 text-gray-500 transition-colors duration-200 hover:bg-gray-100"
                >
                <Sparkles className="h-6 w-6 text-accent" />
                </a>
            </TooltipTrigger>
             <TooltipContent side="right"><p>AI Expert</p></TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
                <a
                href="#"
                onClick={(e) => { e.preventDefault(); logout(); }}
                className="flex items-center justify-center w-full h-16 text-gray-500 transition-colors duration-200 hover:bg-gray-100"
                >
                <LogOut className="h-6 w-6 text-red-500" />
                </a>
            </TooltipTrigger>
            <TooltipContent side="right"><p>Logout</p></TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </aside>
  );
}

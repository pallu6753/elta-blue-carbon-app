'use client';
import React, { useContext } from 'react';
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
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

const navItems = [
  { view: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', roles: ['Project Developer', 'Verifier', 'Investor', 'Regulator'] },
  { view: 'projects', icon: HardHat, label: 'Projects', roles: ['Project Developer', 'Verifier', 'Regulator'] },
  { view: 'mrv', icon: CheckSquare, label: 'MRV/Reports', roles: ['Project Developer', 'Verifier'] },
  { view: 'marketplace', icon: Landmark, label: 'Marketplace', roles: ['Investor'] },
  { view: 'map', icon: MapPin, label: 'Map View', roles: ['Project Developer', 'Verifier', 'Investor', 'Regulator'] },
];

export default function MobileSidebar() {
  const { role, logout, setAssistantModalOpen, setActiveView } = useContext(AppContext) as AppContextType;
  const { toast } = useToast();

  const filteredNavItems = navItems.filter(item => item.roles.includes(role!));

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="h-16 flex items-center justify-center border-b">
        <Waves className="text-blue-carbon h-7 w-7" />
        <span className="ml-2 text-xl font-extrabold text-gray-800">Elta</span>
      </div>
      <div className="p-4">
        <p className="text-sm font-semibold text-gray-700 px-3 py-1 bg-gray-100 rounded-lg text-center mb-4">
          {role} View
        </p>
      </div>
      <nav className="flex flex-col space-y-2 p-4 flex-grow">
        {filteredNavItems.map(item => (
          <Button
            key={item.view}
            variant="ghost"
            className="justify-start text-lg"
            onClick={() => setActiveView(item.view)}
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.label}
          </Button>
        ))}
      </nav>
      <div className="p-4 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start text-lg text-accent hover:text-accent"
          onClick={() => setAssistantModalOpen(true)}
        >
          <Sparkles className="h-5 w-5 mr-3" />
          AI Expert
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-lg text-destructive hover:text-destructive"
          onClick={logout}
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  );
}

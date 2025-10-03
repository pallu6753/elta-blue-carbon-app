'use client';
import React, { useContext, useState } from 'react';
import { Waves, ArrowRight } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { AppContext, AppContextType, Role } from '@/context/AppProvider';

export default function Hero() {
  const { setRole } = useContext(AppContext) as AppContextType;
  const [selectedRole, setSelectedRole] = useState<Role | ''>('');

  const handleEnter = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole) {
      setRole(selectedRole as Role);
    }
  };

  return (
    <div className="text-center max-w-sm w-full p-8 rounded-xl bg-white/10 backdrop-blur-sm">
      <Waves className="h-10 w-10 mx-auto mb-2 text-white" />
      <h1 className="text-4xl font-extrabold mb-1 text-white">Elta</h1>
      <p className="text-base text-gray-200 mb-8">
        The future of blue carbon, powered by AI and Web3.
      </p>

      <form onSubmit={handleEnter}>
        <Select onValueChange={(value) => setSelectedRole(value as Role)} value={selectedRole || undefined}>
          <SelectTrigger className="w-full p-3 mb-6 bg-white text-gray-800 border border-gray-300 rounded-lg shadow-inner focus:ring-primary focus:border-primary h-auto text-base">
            <SelectValue placeholder="Select your role..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Project Developer">Project Developer</SelectItem>
            <SelectItem value="Verifier">Verifier</SelectItem>
            <SelectItem value="Investor">Investor</SelectItem>
            <SelectItem value="Regulator">Regulator</SelectItem>
          </SelectContent>
        </Select>

        <Button type="submit" size="lg" className="w-full text-lg h-auto py-3" disabled={!selectedRole}>
          <span>Enter Dashboard</span>
          <ArrowRight className="h-5 w-5" />
        </Button>
      </form>

      <p className="text-xs text-gray-400 mt-6">
        By clicking continue, you agree to our{' '}
        <a href="#" className="underline hover:text-white">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="#" className="underline hover:text-white">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}

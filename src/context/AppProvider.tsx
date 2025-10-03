'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

export type Role = 'Project Developer' | 'Verifier' | 'Investor' | 'Regulator' | null;

export interface AppContextType {
  role: Role;
  setRole: (role: Role) => void;
  isAssistantModalOpen: boolean;
  setAssistantModalOpen: (isOpen: boolean) => void;
  isNewProjectModalOpen: boolean;
  setNewProjectModalOpen: (isOpen: boolean) => void;
  activeView: string;
  setActiveView: (view: string) => void;
  logout: () => void;
}

export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRoleState] = useState<Role>(null);
  const [isAssistantModalOpen, setAssistantModalOpen] = useState(false);
  const [isNewProjectModalOpen, setNewProjectModalOpen] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    try {
      const storedRole = localStorage.getItem('elta-role') as Role;
      if (storedRole) {
        setRoleState(storedRole);
        const currentPath = window.location.pathname.split('/').pop();
        if(currentPath && currentPath !== ''){
          setActiveView(currentPath);
        } else {
          setActiveView('dashboard');
        }
      }
    } catch (error) {
      console.error('Could not access localStorage:', error);
    }
  }, []);

  const setRole = (newRole: Role) => {
    setRoleState(newRole);
    if (newRole) {
      try {
        localStorage.setItem('elta-role', newRole);
      } catch (error) {
         console.error('Could not access localStorage:', error);
      }
      setActiveView('dashboard');
      router.push('/'); // Navigate to main page which will show dashboard
    } else {
      try {
        localStorage.removeItem('elta-role');
      } catch (error) {
        console.error('Could not access localStorage:', error);
      }
    }
  };

  const logout = () => {
    setRole(null);
    router.push('/');
  };

  const value = {
    role,
    setRole,
    isAssistantModalOpen,
    setAssistantModalOpen,
    isNewProjectModalOpen,
    setNewProjectModalOpen,
    activeView,
    setActiveView,
    logout,
  };

  if (!isMounted) {
    return null; // or a loading spinner
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

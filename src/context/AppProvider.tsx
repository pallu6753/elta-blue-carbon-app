'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, initiateAnonymousSignIn, useUser } from '@/firebase';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { useFirestore } from '@/firebase';

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
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  useEffect(() => {
    setIsMounted(true);
    if (!auth) return;
    
    initiateAnonymousSignIn(auth);
  }, [auth]);
  
  useEffect(() => {
    if (isUserLoading || !user || !firestore) return;

    const fetchRole = async () => {
      const userProfileRef = doc(firestore, 'users', user.uid);
      const userProfileSnap = await getDoc(userProfileRef);
      if (userProfileSnap.exists()) {
        const userRole = userProfileSnap.data().role as Role;
        setRoleState(userRole);
        const currentPath = window.location.pathname.split('/').pop();
        if(currentPath && currentPath !== ''){
          setActiveView(currentPath);
        } else {
          setActiveView('dashboard');
        }
      }
    };
    fetchRole();
  }, [user, isUserLoading, firestore]);
  

  const setRole = async (newRole: Role) => {
    if (!user || !firestore) return;
    
    setRoleState(newRole);
    
    const userProfileRef = doc(firestore, 'users', user.uid);
    
    if (newRole) {
      await setDoc(userProfileRef, {
        userId: user.uid,
        role: newRole,
        lastLogin: serverTimestamp(),
      }, { merge: true });
      
      setActiveView('dashboard');
      router.push('/');
    } else {
      // In this app, we don't really have a "logout" that clears the role,
      // because we are using anonymous auth. But if we did, we'd clear the doc.
    }
  };

  const logout = () => {
    // For this app, logout just clears the role from state and goes to the landing page.
    setRoleState(null); 
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

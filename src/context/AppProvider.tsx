'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, initiateAnonymousSignIn, useUser } from '@/firebase';
import { doc, setDoc, getDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { Auth, signOut } from 'firebase/auth';

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
  user: any;
}

export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRoleState] = useState<Role>(null);
  const [isAssistantModalOpen, setAssistantModalOpen] = useState(false);
  const [isNewProjectModalOpen, setNewProjectModalOpen] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const auth = useAuth() as Auth;
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  useEffect(() => {
    if (isUserLoading || !auth) return;

    if (!user) {
      initiateAnonymousSignIn(auth);
    }
  }, [user, isUserLoading, auth]);
  
  useEffect(() => {
    if (!user || !firestore) return;

    const userProfileRef = doc(firestore, 'users', user.uid);
    const unsubscribe = onSnapshot(userProfileRef, (doc) => {
      if (doc.exists() && doc.data().role) {
        setRoleState(doc.data().role as Role);
        if (window.location.pathname === '/') {
          setActiveView('dashboard');
        }
      } else {
        setRoleState(null);
      }
    });

    return () => unsubscribe();
  }, [user, firestore, router]);
  

  const setRole = async (newRole: Role) => {
    if (!user || !firestore || !newRole) return;
    
    const userProfileRef = doc(firestore, 'users', user.uid);
    
    try {
      await setDoc(userProfileRef, {
        userId: user.uid,
        role: newRole,
        lastLogin: serverTimestamp(),
      }, { merge: true });
      
      setRoleState(newRole);
      setActiveView('dashboard');
    } catch (error) {
      console.error("Error setting user role:", error);
    }
  };

  const logout = () => {
    // For anonymous auth, "logging out" means resetting the role
    // and navigating to the landing page. A true sign-out is not needed
    // as the session is temporary.
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
    user,
  };

  if (!isMounted) {
    return null;
  }

  // Show dashboard if role is set, otherwise show landing page (with role selection)
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

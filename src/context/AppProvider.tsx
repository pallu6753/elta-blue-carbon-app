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
    if (isUserLoading || !firestore) return;

    if (!user) {
      // User is logged out or session expired
      setRoleState(null);
      if (window.location.pathname.startsWith('/dashboard')) {
          router.push('/');
      }
      return;
    }

    // User is logged in, listen for role changes
    const userProfileRef = doc(firestore, 'users', user.uid);
    const unsubscribe = onSnapshot(userProfileRef, (doc) => {
      if (doc.exists()) {
        const userRole = doc.data().role as Role;
        if (userRole) {
          setRoleState(userRole);
          // If they have a role and are on the landing page, move to dashboard
          if (window.location.pathname === '/') {
            setActiveView('dashboard');
          }
        } else {
          // User is logged in but has no role yet
          setRoleState(null);
        }
      } else {
        // This is a new user who has just signed up.
        // The setRole function will create their profile.
        setRoleState(null);
      }
    });

    return () => unsubscribe();

  }, [user, isUserLoading, firestore, router]);
  

  const setRole = async (newRole: Role) => {
    if (!user || !firestore || !newRole) return;
    
    const userProfileRef = doc(firestore, 'users', user.uid);
    
    try {
      await setDoc(userProfileRef, {
        userId: user.uid,
        role: newRole,
        lastLogin: serverTimestamp(),
      }, { merge: true });
      
      setRoleState(newRole); // Eagerly update state
      setActiveView('dashboard');
    } catch (error) {
      console.error("Error setting user role:", error);
    }
  };

  const logout = () => {
    if (auth) {
        signOut(auth).then(() => {
            setRoleState(null); 
            router.push('/');
        });
    }
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
    return null; // or a loading spinner
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

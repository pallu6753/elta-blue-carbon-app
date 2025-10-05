'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, initiateAnonymousSignIn, useUser } from '@/firebase';
import { doc, setDoc, getDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { Auth, signOut } from 'firebase/auth';
import { ethers } from 'ethers';

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
  walletAddress: string | null;
  connectWallet: () => void;
}

export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRoleState] = useState<Role>(null);
  const [isAssistantModalOpen, setAssistantModalOpen] = useState(false);
  const [isNewProjectModalOpen, setNewProjectModalOpen] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');
  const [isMounted, setIsMounted] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
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
  
  const connectWallet = async () => {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send('eth_requestAccounts', []);
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    } else {
      alert("Please install MetaMask or another Ethereum wallet.");
    }
  };

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
    setWalletAddress(null); // Disconnect wallet on logout
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
    walletAddress,
    connectWallet,
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

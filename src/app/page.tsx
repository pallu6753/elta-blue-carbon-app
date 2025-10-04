'use client';

import { useContext } from 'react';
import { AppContext, AppContextType } from '@/context/AppProvider';
import LandingPage from '@/components/landing/LandingPage';
import DashboardPage from '@/components/dashboard/DashboardPage';
import { useUser } from '@/firebase';

export default function Home() {
  const { role } = useContext(AppContext) as AppContextType;
  const { isUserLoading } = useUser();

  if (isUserLoading) {
    // You can return a loading spinner here
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return <main>{role ? <DashboardPage /> : <LandingPage />}</main>;
}

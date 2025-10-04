'use client';

import { useContext } from 'react';
import { AppContext, AppContextType } from '@/context/AppProvider';
import LandingPage from '@/components/landing/LandingPage';
import DashboardPage from '@/components/dashboard/DashboardPage';
import { useUser } from '@/firebase';

export default function Home() {
  const { role, user } = useContext(AppContext) as AppContextType;
  const { isUserLoading } = useUser();

  if (isUserLoading) {
    // You can return a loading spinner here
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // If user is logged in, show dashboard or role selection
  // If no user, show landing page
  return <main>{user ? <DashboardPage /> : <LandingPage />}</main>;
}

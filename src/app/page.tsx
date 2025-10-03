'use client';

import { useContext } from 'react';
import { AppContext, AppContextType } from '@/context/AppProvider';
import LandingPage from '@/components/landing/LandingPage';
import DashboardPage from '@/components/dashboard/DashboardPage';

export default function Home() {
  const { role } = useContext(AppContext) as AppContextType;

  return <main>{role ? <DashboardPage /> : <LandingPage />}</main>;
}

'use client';

import React, { useContext } from 'react';
import { AppContext, AppContextType } from '@/context/AppProvider';
import Sidebar from './Sidebar';
import Header from './Header';
import DeveloperDashboard from './developer/DeveloperDashboard';
import VerifierDashboard from './verifier/VerifierDashboard';
import InvestorDashboard from './investor/InvestorDashboard';
import RegulatorDashboard from './regulator/RegulatorDashboard';
import ProjectsView from './views/ProjectsView';
import MRVView from './views/MRVView';
import MarketplaceView from './views/MarketplaceView';
import MapView from './views/MapView';
import AIAssistantModal from './modals/AIAssistantModal';
import NewProjectModal from './modals/NewProjectModal';

const viewComponents: { [key: string]: React.ComponentType } = {
  projects: ProjectsView,
  mrv: MRVView,
  marketplace: MarketplaceView,
  map: MapView,
};

export default function DashboardPage() {
  const { role, activeView } = useContext(AppContext) as AppContextType;

  const renderDashboardContent = () => {
    if (activeView === 'dashboard') {
      switch (role) {
        case 'Project Developer':
          return <DeveloperDashboard />;
        case 'Verifier':
          return <VerifierDashboard />;
        case 'Investor':
          return <InvestorDashboard />;
        case 'Regulator':
          return <RegulatorDashboard />;
        default:
          return <div>Unknown Role</div>;
      }
    }
    const ViewComponent = viewComponents[activeView];
    return ViewComponent ? <ViewComponent /> : <div>Page not found</div>;
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-grow flex flex-col md:ml-16">
        <Header />
        <main className="flex-grow p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {renderDashboardContent()}
          </div>
        </main>
        <footer className="bg-gray-900 text-white p-6 text-center text-sm">
          &copy; 2025 Elta | Blue Carbon Certification. All rights reserved.
        </footer>
      </div>
      <AIAssistantModal />
      <NewProjectModal />
    </div>
  );
}

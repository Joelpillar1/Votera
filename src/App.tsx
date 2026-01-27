import React, { useState } from 'react';
import Shell from './components/layout/Shell';
import Dashboard from './pages/Dashboard';
import CampaignDetails from './pages/CampaignDetails';
import CreateCampaign from './pages/CreateCampaign';
import Campaigns from './pages/Campaigns';
import Governance from './pages/Governance';
import Activity from './pages/Activity';
import Leaderboard from './pages/Leaderboard';
import Settings from './pages/Settings';
import LandingPage from './pages/LandingPage';
import Profile from './pages/Profile';
import { Button } from './components/ui/button';
import { Campaign, CampaignStatus } from './types';
import { mockCampaigns, mockTasks } from './data/mockData';

const PlaceholderPage = ({ title }: { title: string }) => (
    <div className="flex flex-col items-center justify-center h-[50vh] text-center space-y-4">
        <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
            <span className="text-4xl">🚧</span>
        </div>
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <p className="text-muted-foreground max-w-md">
            This module is currently under active development. High-fidelity prototypes will be deployed shortly.
        </p>
        <Button variant="outline">Return to Dashboard</Button>
    </div>
);

const App: React.FC = () => {
    const [navState, setNavState] = useState<{ page: string; data?: any }>({ page: 'landing' });

    const handleNavigate = (page: string, data?: any) => {
        setNavState({ page, data });
    };

    const renderPage = () => {
        switch (navState.page) {
            case 'landing':
                return <LandingPage onEnterApp={() => handleNavigate('dashboard')} />;
            case 'dashboard':
                return <Dashboard onNavigate={handleNavigate} />;
            case 'campaign-details':
                if (navState.data) {
                    return <CampaignDetails campaign={navState.data as Campaign} onBack={() => handleNavigate('campaigns')} />;
                }
                return <Dashboard onNavigate={handleNavigate} />;
            case 'create-campaign':
                return <CreateCampaign onBack={() => handleNavigate('dashboard')} onSubmit={(data) => {
                    console.log('Igniting Campaign:', data);
                    const newId = Date.now();

                    // Add to mock data for real-time update
                    mockCampaigns.unshift({
                        id: newId,
                        title: data.title,
                        objective: data.objective,
                        organizer_id: 2, // Hardcoded for demo 'Voterax Operator'
                        timeline: { start: data.startDate || '2024-01-01', end: data.endDate || '2024-12-31' },
                        status: CampaignStatus.ACTIVE,
                        coverImage: data.coverImage,
                        budget: parseFloat(data.budget) || 5000 // Default fallback if empty
                    });

                    // Add tasks to mock data
                    if (data.tasks && data.tasks.length > 0) {
                        data.tasks.forEach((t: any, index: number) => {
                            mockTasks.push({
                                id: Date.now() + index, // unique ID
                                campaign_id: newId,
                                description: t.title, // using title as description based on CreateCampaign form
                                CP_value: parseInt(data.cpPerTask) || 100
                            });
                        });
                    }

                    handleNavigate('campaigns');
                }} />;
            case 'campaigns':
                return <Campaigns onNavigate={handleNavigate} />;
            case 'governance':
                return <Governance onNavigate={handleNavigate} />;
            case 'leaderboard':
                return <Leaderboard />;
            case 'settings':
                return <Settings />;
            case 'activity':
                return <Activity />;
            case 'profile':
                return <Profile onNavigate={handleNavigate} />;
            default:
                return <Dashboard onNavigate={handleNavigate} />;
        }
    };

    if (navState.page === 'landing') {
        return renderPage();
    }

    return (
        <Shell currentPage={navState.page} onNavigate={handleNavigate}>
            {renderPage()}
        </Shell>
    );
};

export default App;

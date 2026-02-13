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
import TaskSubmissionPage from './pages/TaskSubmissionPage';
import CampaignResults from './pages/CampaignResults';
import AuthModal from './components/auth/AuthModal';
import { Campaign, CampaignStatus, UserRole } from './types';
import { mockCampaigns, mockTasks } from './data/mockData';

const App: React.FC = () => {
    const [navState, setNavState] = useState<{ page: string; data?: any }>({ page: 'landing' });
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

    // Mock current user - Contributors are the primary users of the platform
    // Change to UserRole.ORGANIZER to test organizer view (campaign creation)
    const [currentUserRole] = useState<UserRole>(UserRole.CONTRIBUTOR);

    const handleNavigate = (page: string, data?: any) => {
        setNavState({ page, data });
        window.scrollTo(0, 0);
    };

    const handleLogin = (address: string) => {
        setWalletAddress(address);
        if (navState.page === 'landing') {
            handleNavigate('dashboard');
        }
    };

    const handleConnect = (mode: 'login' | 'signup' = 'login') => {
        setAuthMode(mode);
        setIsAuthModalOpen(true);
    };

    const renderPage = () => {
        switch (navState.page) {
            case 'landing':
                return <LandingPage onConnect={handleConnect} />;
            case 'dashboard':
                return <Dashboard onNavigate={handleNavigate} />;
            case 'campaign-details':
                if (navState.data) {
                    return <CampaignDetails
                        campaign={navState.data as Campaign}
                        onBack={() => handleNavigate('campaigns')}
                        onResults={() => handleNavigate('campaign-results', navState.data)}
                    />;
                }
                return <Dashboard onNavigate={handleNavigate} />;
            case 'task-submission':
                return <TaskSubmissionPage onBack={() => handleNavigate('campaign-details', navState.data?.campaign)} />;
            case 'campaign-results':
                if (navState.data) {
                    return <CampaignResults campaign={navState.data as Campaign} onBack={() => handleNavigate('campaigns')} />;
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
                return <Campaigns onNavigate={handleNavigate} userRole={currentUserRole} />;
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

    return (
        <>
            {navState.page === 'landing' ? (
                renderPage()
            ) : (
                <Shell currentPage={navState.page} onNavigate={handleNavigate} walletAddress={walletAddress} onConnect={() => handleConnect('login')}>
                    {renderPage()}
                </Shell>
            )}

            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                onLogin={handleLogin}
                initialMode={authMode}
            />
        </>
    );
};

export default App;

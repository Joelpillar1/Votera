import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    LayoutDashboard,
    Vote,
    Trophy,
    Settings,
    LogOut,
    Hexagon,
    Activity,
    Users
} from 'lucide-react';

interface SidebarProps {
    className?: string;
    activePath?: string;
    onNavigate: (path: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ className, activePath = 'dashboard', onNavigate }) => {
    const navItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: 'dashboard' },
        { name: 'Campaigns', icon: Hexagon, path: 'campaigns' },
        { name: 'Governance', icon: Vote, path: 'governance' },
        { name: 'Leaderboard', icon: Trophy, path: 'leaderboard' },
        { name: 'Activity', icon: Activity, path: 'activity' },
    ];

    return (
        <div className={cn("glass-panel h-screen overflow-hidden w-64 flex flex-col fixed left-0 top-0 z-50 border-r border-white/10", className)}>
            <div className="p-8 pb-4">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                        <span className="font-bold text-white text-lg">V</span>
                    </div>
                    <span className="text-2xl font-bold tracking-tight font-display text-white">Voterax</span>
                </div>
                <div className="mt-1 pl-10">
                    <span className="text-xs text-muted-foreground uppercase tracking-widest">Coordination OS</span>
                </div>
            </div>

            <div className="flex-1 py-8 px-4 space-y-2">
                {navItems.map((item) => (
                    <Button
                        key={item.path}
                        variant={activePath === item.path ? 'neon' : 'ghost'}
                        className={cn(
                            "w-full justify-start gap-3 h-12 text-base font-medium transition-all group",
                            activePath === item.path ? "translate-x-1" : "hover:translate-x-1"
                        )}
                        onClick={() => onNavigate(item.path)}
                    >
                        <item.icon className={cn("h-5 w-5", activePath === item.path ? "text-primary" : "text-muted-foreground group-hover:text-white")} />
                        {item.name}
                    </Button>
                ))}
            </div>

            <div className="p-4 border-t border-white/5 mt-auto space-y-2">
                <div
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors group"
                    onClick={() => onNavigate('profile')}
                >
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-[2px]">
                        <div className="h-full w-full rounded-full bg-black flex items-center justify-center">
                            <span className="font-bold text-white text-sm">A</span>
                        </div>
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <div className="text-sm font-bold text-white truncate group-hover:text-primary transition-colors">Alice C.</div>
                        <div className="text-xs text-gray-500 truncate">1,250 RP</div>
                    </div>
                    <div
                        className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            onNavigate('settings');
                        }}
                    >
                        <Settings className="h-4 w-4 text-gray-500 hover:text-white" />
                    </div>
                </div>

                <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start gap-2 text-xs text-muted-foreground hover:text-red-400 hover:bg-red-950/20 h-8"
                    onClick={() => onNavigate('landing')}
                >
                    <LogOut className="h-3 w-3" />
                    Sign Out
                </Button>
            </div>
        </div>
    );
};

export default Sidebar;

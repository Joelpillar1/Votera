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
    User
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
    className?: string;
    activePath?: string;
    onNavigate: (path: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ className, activePath = 'dashboard', onNavigate }) => {
    const navItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: 'dashboard' },
        { name: 'Campaigns', icon: Hexagon, path: 'campaigns' },
        { name: 'Governance', icon: Vote, path: 'governance' },
        { name: 'Leaderboard', icon: Trophy, path: 'leaderboard' },
        { name: 'Activity', icon: Activity, path: 'activity' },
    ];

    return (
        <nav className={cn("fixed top-0 left-0 right-0 z-50 h-20 border-b border-white/10 bg-[#020202]/80 backdrop-blur-xl flex items-center px-8 justify-between", className)}>

            {/* Logo Section */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('dashboard')}>
                <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                    <span className="font-bold text-white text-lg">V</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-xl font-bold tracking-tight font-display text-white leading-none">Voterax</span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">Coordination OS</span>
                </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-1">
                {navItems.map((item) => (
                    <Button
                        key={item.path}
                        variant="ghost"
                        className={cn(
                            "h-10 px-4 rounded-full text-sm font-medium transition-all",
                            activePath === item.path
                                ? "bg-white/10 text-white shadow-inner"
                                : "text-muted-foreground hover:text-white hover:bg-white/5"
                        )}
                        onClick={() => onNavigate(item.path)}
                    >
                        <item.icon className={cn("mr-2 h-4 w-4", activePath === item.path ? "text-primary" : "text-muted-foreground")} />
                        {item.name}
                    </Button>
                ))}
            </div>

            {/* User Profile / Actions */}
            <div className="flex items-center gap-4">
                <div className="hidden md:flex flex-col items-end mr-2">
                    <span className="text-sm font-bold text-white">Alice C.</span>
                    <span className="text-[10px] font-mono text-primary font-bold">1,250 RP</span>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 overflow-hidden hover:ring-2 hover:ring-primary/50 transition-all">
                            <div className="h-full w-full bg-gradient-to-br from-indigo-500 to-purple-600">
                                <span className="flex h-full w-full items-center justify-center text-sm font-bold text-white bg-black/10">A</span>
                            </div>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-[#0a0a0a] border-white/10 text-white" align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-white/10" />
                        <DropdownMenuItem className="cursor-pointer hover:bg-white/10 focus:bg-white/10" onClick={() => onNavigate('profile')}>
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer hover:bg-white/10 focus:bg-white/10" onClick={() => onNavigate('settings')}>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-white/10" />
                        <DropdownMenuItem className="cursor-pointer text-red-400 hover:text-red-300 hover:bg-red-900/20 focus:bg-red-900/20" onClick={() => onNavigate('landing')}>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    );
};

export default Navbar;

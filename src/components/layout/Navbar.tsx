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
    User,
    Bell
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
    walletAddress: string | null;
    onConnect: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ className, activePath = 'dashboard', onNavigate, walletAddress, onConnect }) => {
    const navItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: 'dashboard' },
        { name: 'Campaigns', icon: Hexagon, path: 'campaigns' },
        { name: 'Campaign Forum', icon: Vote, path: 'governance' },
        { name: 'Leaderboard', icon: Trophy, path: 'leaderboard' },
        { name: 'Activity', icon: Activity, path: 'activity' },
    ];

    const formatAddress = (addr: string) => {
        return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
    };

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

            {/* Notifications & User Profile */}
            <div className="flex items-center gap-4">
                {/* Notifications Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 hover:bg-white/10 text-muted-foreground hover:text-white transition-colors">
                            <div className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-[#020202]"></div>
                            <Bell className="h-5 w-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-80 bg-[#0a0a0a] border-white/10 text-white" align="end">
                        <DropdownMenuLabel className="flex items-center justify-between">
                            <span>Notifications</span>
                            <span className="text-[10px] text-muted-foreground font-normal">Mark all read</span>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-white/10" />
                        <div className="max-h-[300px] overflow-y-auto">
                            {[
                                { title: 'Proposal Passed', desc: 'Uniswap V4 Hookathon proposal passed.', time: '2h ago', color: 'text-green-400' },
                                { title: 'New Task', desc: 'Design task added to "Optimism RPG"', time: '4h ago', color: 'text-blue-400' },
                                { title: 'Voting Alert', desc: 'Binance Listing Vote ends soon.', time: '1d ago', color: 'text-yellow-400' }
                            ].map((n, i) => (
                                <DropdownMenuItem key={i} className="cursor-pointer hover:bg-white/10 focus:bg-white/10 flex flex-col items-start gap-1 p-3">
                                    <div className="flex w-full justify-between items-center">
                                        <span className={`text-xs font-bold ${n.color}`}>{n.title}</span>
                                        <span className="text-[10px] text-gray-500">{n.time}</span>
                                    </div>
                                    <p className="text-xs text-gray-300 line-clamp-2">{n.desc}</p>
                                </DropdownMenuItem>
                            ))}
                        </div>
                        <DropdownMenuSeparator className="bg-white/10" />
                        <DropdownMenuItem className="cursor-pointer justify-center text-xs text-muted-foreground hover:text-white hover:bg-white/10 focus:bg-white/10">
                            View all notifications
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {!walletAddress ? (
                    <Button onClick={onConnect} className="rounded-full bg-white text-black hover:bg-gray-200 font-medium px-6 h-10 transition-transform hover:scale-105 active:scale-95">
                        Connect Wallet
                    </Button>
                ) : (
                    <>
                        <div className="hidden md:flex flex-col items-end mr-2">
                            <span className="text-sm font-bold text-white">{formatAddress(walletAddress)}</span>
                        </div>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 overflow-hidden hover:ring-2 hover:ring-primary/50 transition-all">
                                    <div className="h-full w-full bg-gradient-to-br from-indigo-500 to-purple-600">
                                        <span className="flex h-full w-full items-center justify-center text-xs font-mono font-bold text-white bg-black/10">
                                            {walletAddress.substring(2, 4)}
                                        </span>
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
                                    <span>Disconnect</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

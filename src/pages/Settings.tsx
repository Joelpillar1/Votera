import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
    User,
    Bell,
    Shield,
    Wallet,
    Globe,
    LogOut,
    Trash2,
    Mail,
    Smartphone,
    Key,
    CheckCircle2,
    Github,
    Twitter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Settings: React.FC = () => {
    const [activeTab, setActiveTab] = useState('profile');

    // Mock State for Form Interactions
    const [notifications, setNotifications] = useState({
        emailCampaigns: true,
        emailGovernance: true,
        pushRewards: false,
        pushVotes: true
    });

    const menuItems = [
        { id: 'profile', label: 'Profile', icon: User, desc: 'Manage your public identity' },
        { id: 'account', label: 'Account Security', icon: Shield, desc: 'Password and 2FA' },
        { id: 'wallet', label: 'Connected Wallets', icon: Wallet, desc: 'Manage Web3 connections' },
        { id: 'notifications', label: 'Notifications', icon: Bell, desc: 'Email and push preferences' },
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold font-display text-white">Settings</h1>
                <p className="text-muted-foreground">Manage your account settings and preferences.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Navigation */}
                <div className="w-full lg:w-64 space-y-2 shrink-0">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full text-left p-4 rounded-xl transition-all duration-200 flex items-center gap-3 group ${activeTab === item.id
                                    ? 'bg-primary/20 border border-primary/20 text-white shadow-[0_0_15px_rgba(99,102,241,0.2)]'
                                    : 'bg-white/5 border border-transparent text-gray-400 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            <item.icon className={`h-5 w-5 ${activeTab === item.id ? 'text-primary' : 'text-gray-500 group-hover:text-white'}`} />
                            <div>
                                <div className="font-medium text-sm">{item.label}</div>
                            </div>
                        </button>
                    ))}

                    <div className="pt-8 mt-8 border-t border-white/10">
                        <button className="w-full text-left p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors flex items-center gap-3">
                            <LogOut className="h-5 w-5" />
                            <span className="font-medium text-sm">Log Out</span>
                        </button>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            {/* PROFILE TAB */}
                            {activeTab === 'profile' && (
                                <div className="space-y-6">
                                    <div className="p-8 rounded-2xl bg-[#0A0A0A] border border-white/10 space-y-8">
                                        <div className="flex items-center gap-6">
                                            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white shadow-2xl relative group cursor-pointer">
                                                VO
                                                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <span className="text-xs font-medium">Change</span>
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-white">Voterax Operator</h3>
                                                <p className="text-sm text-gray-500">operator@voterax.com</p>
                                                <div className="mt-2 inline-flex items-center gap-2 px-2 py-1 rounded bg-green-500/10 border border-green-500/20 text-xs text-green-400">
                                                    <CheckCircle2 className="h-3 w-3" /> Verified Contributor
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="username">Username</Label>
                                                <Input id="username" placeholder="Enter username" defaultValue="voterax_op" className="bg-black/20 border-white/10" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="title">Professional Title</Label>
                                                <Input id="title" placeholder="e.g. Protocol Engineer" defaultValue="Protocol Engineer" className="bg-black/20 border-white/10" />
                                            </div>
                                            <div className="col-span-2 space-y-2">
                                                <Label htmlFor="bio">Bio</Label>
                                                <textarea
                                                    id="bio"
                                                    className="flex w-full rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
                                                    placeholder="Tell us about your contribution history..."
                                                />
                                            </div>
                                        </div>

                                        <div className="border-t border-white/10 pt-6">
                                            <h4 className="text-sm font-medium text-white mb-4">Social Connections</h4>
                                            <div className="flex gap-4">
                                                <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 gap-2">
                                                    <Github className="h-4 w-4" /> Connect Github
                                                </Button>
                                                <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 gap-2">
                                                    <Twitter className="h-4 w-4" /> Connect Twitter
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">Save Changes</Button>
                                    </div>
                                </div>
                            )}

                            {/* SECURITY TAB */}
                            {activeTab === 'account' && (
                                <div className="space-y-6">
                                    <Card className="bg-[#0A0A0A] border-white/10">
                                        <CardHeader>
                                            <CardTitle>Password Security</CardTitle>
                                            <CardDescription>Update your password to keep your account secure.</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="space-y-2">
                                                <Label>Current Password</Label>
                                                <Input type="password" placeholder="••••••••" className="bg-black/20 border-white/10" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label>New Password</Label>
                                                    <Input type="password" placeholder="Enter new password" className="bg-black/20 border-white/10" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Confirm Password</Label>
                                                    <Input type="password" placeholder="Confirm new password" className="bg-black/20 border-white/10" />
                                                </div>
                                            </div>
                                            <div className="pt-2">
                                                <Button>Update Password</Button>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="bg-[#0A0A0A] border-white/10">
                                        <CardHeader>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <CardTitle>Two-Factor Authentication</CardTitle>
                                                    <CardDescription>Add an extra layer of security.</CardDescription>
                                                </div>
                                                <div className="bg-green-500/10 text-green-500 px-3 py-1 rounded text-xs font-bold uppercase tracking-widest border border-green-500/20">
                                                    Enabled
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-gray-400 mb-4">
                                                Your account is currently protected by an authenticator app (Google Auth, Authy, etc).
                                            </p>
                                            <Button variant="outline" className="border-red-500/20 text-red-400 hover:bg-red-500/10 hover:text-red-300">Disable 2FA</Button>
                                        </CardContent>
                                    </Card>

                                    <div className="pt-8 border-t border-red-900/20">
                                        <h3 className="text-xl font-bold text-red-500 mb-4 flex items-center gap-2">
                                            <Trash2 className="h-5 w-5" /> Danger Zone
                                        </h3>
                                        <div className="bg-red-950/20 border border-red-900/30 rounded-xl p-6 flex items-center justify-between">
                                            <div>
                                                <div className="font-bold text-white mb-1">Delete Account</div>
                                                <p className="text-sm text-gray-500">Permanently remove your account and all associated data. Your Reputation (RP) will be burned.</p>
                                            </div>
                                            <Button variant="destructive" className="bg-red-600 hover:bg-red-700 text-white">Delete Account</Button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* WALLET TAB */}
                            {activeTab === 'wallet' && (
                                <div className="space-y-6">
                                    <div className="p-8 rounded-2xl bg-gradient-to-r from-indigo-900/20 to-purple-900/20 border border-indigo-500/20 flex flex-col items-center justify-center text-center space-y-4">
                                        <div className="h-16 w-16 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 mb-2">
                                            <Wallet className="h-8 w-8" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white">0x71C...9A21</h3>
                                        <p className="text-gray-400 max-w-sm">This is your primary identity wallet. All Reputation Points (RP) and Combustion events are anchored to this address.</p>
                                        <Button variant="outline" className="border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white">
                                            Disconnect Wallet
                                        </Button>
                                    </div>

                                    <h4 className="text-lg font-bold text-white pt-4">Supported Chains</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {['Ethereum Mainnet', 'Optimism', 'Arbitrum One', 'Base'].map(chain => (
                                            <div key={chain} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 rounded-full bg-white/10"></div>
                                                    <span className="font-medium text-white">{chain}</span>
                                                </div>
                                                <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]"></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* NOTIFICATIONS TAB */}
                            {activeTab === 'notifications' && (
                                <div className="space-y-6">
                                    <Card className="bg-[#0A0A0A] border-white/10">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <Mail className="h-5 w-5 text-indigo-400" /> Email Notifications
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            <div className="flex items-center justify-between">
                                                <div className="space-y-0.5">
                                                    <div className="text-white font-medium">Proposal Alerts</div>
                                                    <div className="text-sm text-gray-400">Receive emails when new governance proposals are created.</div>
                                                </div>
                                                <Switch checked={notifications.emailGovernance} onCheckedChange={(c) => setNotifications({ ...notifications, emailGovernance: c })} />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="space-y-0.5">
                                                    <div className="text-white font-medium">Daily Digest</div>
                                                    <div className="text-sm text-gray-400">A summary of campaign activity and opportunities.</div>
                                                </div>
                                                <Switch checked={notifications.emailCampaigns} onCheckedChange={(c) => setNotifications({ ...notifications, emailCampaigns: c })} />
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="bg-[#0A0A0A] border-white/10">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <Smartphone className="h-5 w-5 text-purple-400" /> Push Notifications
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            <div className="flex items-center justify-between">
                                                <div className="space-y-0.5">
                                                    <div className="text-white font-medium">Combustion Events</div>
                                                    <div className="text-sm text-gray-400">Instant alert when your vote is successfully cast on-chain.</div>
                                                </div>
                                                <Switch checked={notifications.pushVotes} onCheckedChange={(c) => setNotifications({ ...notifications, pushVotes: c })} />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="space-y-0.5">
                                                    <div className="text-white font-medium">Reward Receipts</div>
                                                    <div className="text-sm text-gray-400">Get notified when you earn CP or RP.</div>
                                                </div>
                                                <Switch checked={notifications.pushRewards} onCheckedChange={(c) => setNotifications({ ...notifications, pushRewards: c })} />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            )}

                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Settings;

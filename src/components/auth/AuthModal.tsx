import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Wallet, Mail, ArrowRight, X, Loader2 } from 'lucide-react';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLogin: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [authMethod, setAuthMethod] = useState<'wallet' | 'email'>('wallet');

    const handleWalletConnect = () => {
        setIsLoading(true);
        // Simulate wallet connection
        setTimeout(() => {
            setIsLoading(false);
            onLogin();
            onClose();
        }, 1500);
    };

    const handleEmailAuth = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate email login/signup
        setTimeout(() => {
            setIsLoading(false);
            onLogin();
            onClose();
        }, 1500);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md bg-[#0A0A0A] border-white/10 text-white p-0 overflow-hidden gap-0">
                <div className="p-6 space-y-6">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-display font-medium text-center">
                            Welcome to Voterax
                        </DialogTitle>
                        <DialogDescription className="text-center text-gray-400">
                            Connect your wallet or sign in to start earning reputation.
                        </DialogDescription>
                    </DialogHeader>

                    <Tabs defaultValue="login" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 bg-white/5 border border-white/5">
                            <TabsTrigger value="login">Log In</TabsTrigger>
                            <TabsTrigger value="signup">Sign Up</TabsTrigger>
                        </TabsList>

                        <div className="mt-6 space-y-4">
                            {/* Wallet Option (Primary) */}
                            <Button
                                variant="outline"
                                className="w-full h-12 bg-[#1a1a1a] hover:bg-[#252525] border-white/10 text-white flex items-center justify-between group relative overflow-hidden"
                                onClick={handleWalletConnect}
                                disabled={isLoading}
                            >
                                <span className="flex items-center gap-3 relative z-10">
                                    <div className="h-8 w-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                                        <Wallet className="h-4 w-4" />
                                    </div>
                                    <span className="font-medium">Connect Wallet</span>
                                    <span className="text-xs bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded ml-2 border border-indigo-500/20">Recommended</span>
                                </span>
                                {isLoading && authMethod === 'wallet' ? (
                                    <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                                ) : (
                                    <ArrowRight className="h-4 w-4 text-gray-500 group-hover:text-white transition-colors relative z-10" />
                                )}
                            </Button>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-white/10" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-[#0A0A0A] px-2 text-muted-foreground">Or continue with email</span>
                                </div>
                            </div>

                            <TabsContent value="login">
                                <form onSubmit={handleEmailAuth} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" placeholder="name@example.com" className="bg-white/5 border-white/10 focus-visible:ring-indigo-500/50" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="password">Password</Label>
                                        <Input id="password" type="password" className="bg-white/5 border-white/10 focus-visible:ring-indigo-500/50" required />
                                    </div>
                                    <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200 font-medium" disabled={isLoading} onClick={() => setAuthMethod('email')}>
                                        {isLoading && authMethod === 'email' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                        Log In
                                    </Button>
                                </form>
                            </TabsContent>

                            <TabsContent value="signup">
                                <form onSubmit={handleEmailAuth} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="signup-email">Email</Label>
                                        <Input id="signup-email" type="email" placeholder="name@example.com" className="bg-white/5 border-white/10 focus-visible:ring-indigo-500/50" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="signup-password">Password</Label>
                                        <Input id="signup-password" type="password" className="bg-white/5 border-white/10 focus-visible:ring-indigo-500/50" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="confirm-password">Confirm Password</Label>
                                        <Input id="confirm-password" type="password" className="bg-white/5 border-white/10 focus-visible:ring-indigo-500/50" required />
                                    </div>
                                    <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200 font-medium" disabled={isLoading} onClick={() => setAuthMethod('email')}>
                                        {isLoading && authMethod === 'email' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                        Create Account
                                    </Button>
                                </form>
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>
                <div className="bg-white/5 p-4 text-center text-xs text-gray-500">
                    By continuing, you agree to our Terms of Service and Privacy Policy.
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AuthModal;

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Wallet, ArrowRight, Loader2 } from 'lucide-react';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLogin: (address: string) => void;
}

const GoogleIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
);

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin, initialMode = 'login' }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [authMethod, setAuthMethod] = useState<'google' | 'wallet' | 'email' | null>(null);
    const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showOtp, setShowOtp] = useState(false);
    const [otp, setOtp] = useState('');

    React.useEffect(() => {
        setMode(initialMode);
        setShowOtp(false); // Reset to auth form when opening/changing mode
        setOtp('');
        setEmail('');
        setPassword('');
    }, [initialMode, isOpen]);

    const handleEmailLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setAuthMethod('email');
        setIsLoading(true);

        if (mode === 'signup') {
            // Simulate sending OTP
            setTimeout(() => {
                setIsLoading(false);
                setShowOtp(true);
            }, 1000);
        } else {
            // Simulate Email Login
            setTimeout(() => {
                setIsLoading(false);
                onLogin('0xEmailUser...1234'); // Simulate a user ID/address
                onClose();
            }, 1500);
        }
    }

    const handleOtpVerify = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate OTP verification
        setTimeout(() => {
            setIsLoading(false);
            onLogin('0xEmailUser...1234'); // Simulate a user ID/address
            onClose();
        }, 1500);
    };

    const handleGoogleConnect = () => {
        setAuthMethod('google');
        setIsLoading(true);
        // Simulate Google Sign In -> Wallet Creation
        setTimeout(() => {
            setIsLoading(false);
            // Simulate a generated wallet address from Google credential
            onLogin('0x71C...9A21');
            onClose();
        }, 2000);
    };

    const handleWalletConnect = () => {
        setAuthMethod('wallet');
        setIsLoading(true);
        // Simulate external wallet connection
        setTimeout(() => {
            setIsLoading(false);
            onLogin('0x3f5...8b9c');
            onClose();
        }, 1500);
    };

    const toggleMode = () => {
        setMode(mode === 'login' ? 'signup' : 'login');
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md bg-[#0A0A0A] border-white/10 text-white p-0 overflow-hidden gap-0">
                <div className="p-8 space-y-6">
                    <DialogHeader>
                        <DialogTitle className="text-3xl font-display font-medium text-center">
                            {showOtp ? 'Check your email' : (mode === 'login' ? 'Welcome Back' : 'Create Account')}
                        </DialogTitle>
                        <DialogDescription className="text-center text-gray-400 text-base">
                            {showOtp
                                ? `We sent a code to ${email}. Enter it below to verify your account.`
                                : (mode === 'login'
                                    ? 'Sign in to access your dashboard and reputation.'
                                    : 'Join Voterax to start building your on-chain reputation.')
                            }
                        </DialogDescription>
                    </DialogHeader>

                    {!showOtp ? (
                        <>
                            <form onSubmit={handleEmailLogin} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="bg-[#1a1a1a] border-white/10 focus-visible:ring-primary"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password">Password</Label>
                                        {mode === 'login' && <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>}
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="bg-[#1a1a1a] border-white/10 focus-visible:ring-primary"
                                        required
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full bg-white text-black hover:bg-gray-200"
                                    disabled={isLoading}
                                >
                                    {isLoading && authMethod === 'email' ? (
                                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                    ) : null}
                                    {mode === 'login' ? 'Sign In' : 'Sign Up'} with Email
                                </Button>
                            </form>

                            <div className="text-center text-sm text-gray-400">
                                {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                                <button onClick={toggleMode} className="text-primary hover:underline font-medium focus:outline-none">
                                    {mode === 'login' ? 'Sign up' : 'Log in'}
                                </button>
                            </div>

                            <div className="relative py-2">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-white/10" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-[#0A0A0A] px-2 text-muted-foreground">Or continue with</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {/* Google Option (Primary) */}
                                <Button
                                    variant="outline"
                                    className="w-full h-12 bg-transparent hover:bg-white/5 border-white/10 text-white flex items-center justify-center gap-3 group relative overflow-hidden transition-all"
                                    onClick={handleGoogleConnect}
                                    disabled={isLoading}
                                >
                                    <GoogleIcon className="h-5 w-5" />
                                    <span className="font-medium">Google</span>
                                    {isLoading && authMethod === 'google' && (
                                        <Loader2 className="h-4 w-4 animate-spin text-gray-400 ml-auto" />
                                    )}
                                </Button>

                                {/* Wallet Option (Secondary) */}
                                <Button
                                    variant="outline"
                                    className="w-full h-12 bg-transparent hover:bg-white/5 border-white/10 text-white flex items-center justify-center gap-3 group relative overflow-hidden transition-all"
                                    onClick={handleWalletConnect}
                                    disabled={isLoading}
                                >
                                    <Wallet className="h-5 w-5 text-indigo-400" />
                                    <span className="font-medium">Connect Wallet</span>
                                    {isLoading && authMethod === 'wallet' && (
                                        <Loader2 className="h-4 w-4 animate-spin text-gray-400 ml-auto" />
                                    )}
                                </Button>
                            </div>
                        </>
                    ) : (
                        <form onSubmit={handleOtpVerify} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="otp">Verification Code</Label>
                                <Input
                                    id="otp"
                                    type="text"
                                    placeholder="000000"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="bg-[#1a1a1a] border-white/10 focus-visible:ring-primary text-center text-2xl tracking-[0.5em] font-mono"
                                    maxLength={6}
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-white text-black hover:bg-gray-200"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                ) : null}
                                Verify & Create Account
                            </Button>
                            <div className="text-center text-sm">
                                <button
                                    type="button"
                                    onClick={() => setShowOtp(false)}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    Back to sign up
                                </button>
                            </div>
                        </form>
                    )}
                </div>
                <div className="bg-white/5 p-4 text-center text-xs text-gray-500">
                    By connecting, you agree to our Terms of Service and Privacy Policy.
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AuthModal;

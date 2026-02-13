import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import { cn } from '@/lib/utils';

interface ShellProps {
    children: React.ReactNode;
    currentPage: string;
    onNavigate: (page: string) => void;
    walletAddress?: string | null;
    onConnect?: () => void;
}

const Shell: React.FC<ShellProps> = ({ children, currentPage, onNavigate, walletAddress = null, onConnect = () => { } }) => {
    return (
        <div className="min-h-screen bg-background text-white selection:bg-primary/30">
            <Navbar activePath={currentPage} onNavigate={onNavigate} walletAddress={walletAddress} onConnect={onConnect} />

            <main className="pt-28 pb-12 px-6 relative min-h-screen">
                <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-0 mix-blend-overlay"></div>
                <div className="fixed top-0 left-0 right-0 h-96 bg-gradient-to-b from-indigo-900/10 to-transparent pointer-events-none z-0"></div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentPage}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="relative z-10 max-w-7xl mx-auto"
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
};

export default Shell;

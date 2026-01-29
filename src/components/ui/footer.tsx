"use client";

import React from "react";
import { motion } from "framer-motion";
import { Twitter, Github, Linkedin, Disc, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <li>
        <a
            href={href}
            className="text-gray-400 hover:text-white transition-colors text-sm hover:underline underline-offset-4 decoration-primary/50"
        >
            {children}
        </a>
    </li>
);

const FooterHeader = ({ children }: { children: React.ReactNode }) => (
    <h4 className="text-white font-bold font-display mb-6 tracking-wide text-sm uppercase">
        {children}
    </h4>
);

const SocialLink = ({ href, icon: Icon }: { href: string; icon: React.ElementType }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-primary hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
    >
        <Icon size={18} />
    </a>
);

export const Footer = () => {
    return (
        <footer className="border-t border-white/5 bg-[#020202] pt-24 pb-12 px-6 lg:px-[130px]">
            <div className="w-full mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-20">

                    {/* Brand Column - Spans 2 cols on large screens */}
                    <div className="lg:col-span-2 space-y-8 pr-0 lg:pr-12">
                        <div className="flex items-center gap-2">
                            <div className="relative h-10 w-10 bg-black border border-white/10 rounded-xl flex items-center justify-center overflow-hidden">
                                <span className="font-bold text-white text-xl font-display relative z-10">V</span>
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"></div>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-xl tracking-tight text-white font-display leading-none">Voterax</span>
                                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono mt-1">Coordination OS</span>
                            </div>
                        </div>

                        <p className="text-gray-400 leading-relaxed max-w-sm">
                            The reputation layer for the internet. Building fair, transparent, and participation-driven coordination systems for the next generation of organizations.
                        </p>

                        <div className="flex items-center gap-4">
                            <SocialLink href="#" icon={Twitter} />
                            <SocialLink href="#" icon={Github} />
                            <SocialLink href="#" icon={Disc} /> {/* Discord icon placeholder */}
                            <SocialLink href="#" icon={Linkedin} />
                        </div>
                    </div>

                    {/* Product Column */}
                    <div>
                        <FooterHeader>Product</FooterHeader>
                        <ul className="space-y-4">
                            <FooterLink href="#features">Features</FooterLink>
                            <FooterLink href="#solution">Solutions</FooterLink>
                            <FooterLink href="#use-cases">Use Cases</FooterLink>
                            <FooterLink href="#">Documentation</FooterLink>
                            <FooterLink href="#">API Reference</FooterLink>
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <FooterHeader>Company</FooterHeader>
                        <ul className="space-y-4">
                            <FooterLink href="#">About</FooterLink>
                            <FooterLink href="#">Blog</FooterLink>
                            <FooterLink href="#">Careers</FooterLink>
                            <FooterLink href="#">Brand Kit</FooterLink>
                            <FooterLink href="#">Contact</FooterLink>
                        </ul>
                    </div>

                    {/* Newsletter Column */}
                    <div>
                        <FooterHeader>Stay Updated</FooterHeader>
                        <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                            Get the latest updates on reputation systems and governance.
                        </p>
                        <div className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-primary/50 transition-colors"
                            />
                            <Button className="w-full bg-white text-black hover:bg-gray-200 font-bold">
                                Subscribe
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-gray-500">
                    <p>© {new Date().getFullYear()} Voterax Inc. All rights reserved.</p>
                    <div className="flex items-center gap-8">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

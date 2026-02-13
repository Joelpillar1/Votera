import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, UploadCloud, Link as LinkIcon, FileText, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock data types - would typically come from props or a route param context
interface TaskSubmissionPageProps {
    onBack: () => void;
    // In a real app, we might pass the task ID via URL params
}

const mockTaskDetails = {
    id: 101,
    title: "Design Landing Page Hero Section",
    campaign: "Voterax Protocol Launch",
    description: "Create a high-fidelity mockup for the main landing page hero section. Must include 'Connect Wallet' CTA and 3D abstract elements.",
    reward: 500,
    requirements: [
        "Figma file link required",
        "Must use the new brand color palette",
        "Mobile responsive design considerations"
    ],
    status: "open"
};

const TaskSubmissionPage: React.FC<TaskSubmissionPageProps> = ({ onBack }) => {
    const [submissionType, setSubmissionType] = useState<'link' | 'file'>('link');
    const [linkUrl, setLinkUrl] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsSubmitting(false);
        setSubmitStatus('success');
    };

    if (submitStatus === 'success') {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 text-center"
                >
                    <div className="h-20 w-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
                        <CheckCircle2 className="h-10 w-10" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Submission Received</h2>
                    <p className="text-gray-400 mb-8">
                        Your work has been successfully recorded on-chain. Validators will review your submission within 48 hours.
                    </p>
                    <div className="bg-white/5 rounded-xl p-4 mb-8 text-left">
                        <div className="flex justify-between items-center text-sm mb-2">
                            <span className="text-gray-500">Transaction Hash</span>
                            <span className="text-primary font-mono cursor-pointer hover:underline">0x71...3A9f</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500">Estimated Reward</span>
                            <span className="text-yellow-400 font-bold">{mockTaskDetails.reward} CP</span>
                        </div>
                    </div>
                    <Button onClick={onBack} className="w-full bg-white text-black hover:bg-gray-200">
                        Return to Tasks
                    </Button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-12 animate-in fade-in duration-500">
            <div className="max-w-4xl mx-auto">
                <Button
                    variant="ghost"
                    onClick={onBack}
                    className="mb-8 pl-0 text-gray-500 hover:text-white transition-colors"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Campaign
                </Button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">

                    {/* Left Column: Task Details */}
                    <div className="lg:col-span-1 space-y-8">
                        <div>
                            <span className="text-xs font-bold text-primary uppercase tracking-widest mb-2 block">
                                Task #{mockTaskDetails.id}
                            </span>
                            <h1 className="text-3xl font-bold font-display leading-tight mb-4">
                                {mockTaskDetails.title}
                            </h1>
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400 mb-6">
                                {mockTaskDetails.campaign}
                            </div>
                            <p className="text-gray-400 leading-relaxed text-sm mb-6">
                                {mockTaskDetails.description}
                            </p>

                            <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-5">
                                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <AlertCircle className="h-4 w-4 text-primary" /> Requirements
                                </h3>
                                <ul className="space-y-2">
                                    {mockTaskDetails.requirements.map((req, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                                            <span className="mt-1.5 h-1 w-1 rounded-full bg-gray-600 shrink-0" />
                                            {req}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/5 border border-yellow-500/20 rounded-xl p-6">
                            <span className="text-[10px] font-bold text-yellow-500 uppercase tracking-wider block mb-1">
                                Bounty Reward
                            </span>
                            <span className="text-3xl font-bold text-white">
                                {mockTaskDetails.reward} <span className="text-lg text-white/50">CP</span>
                            </span>
                            <p className="text-xs text-yellow-200/60 mt-2">
                                *Reward distributed upon successful validation.
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Submission Form */}
                    <div className="lg:col-span-2">
                        <Card className="bg-[#0a0a0a] border-white/10 shadow-2xl overflow-hidden">
                            <CardHeader className="border-b border-white/5 pb-6">
                                <CardTitle className="text-xl">Submit Your Contribution</CardTitle>
                                <CardDescription>
                                    Proof of work is required. Ensure your submission meets all requirements before sending.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 md:p-8 space-y-8">

                                {/* 1. Submission Type Toggle */}
                                <div className="grid grid-cols-2 gap-4 p-1 bg-white/5 rounded-xl">
                                    <button
                                        onClick={() => setSubmissionType('link')}
                                        className={`flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all ${submissionType === 'link'
                                                ? 'bg-primary text-white shadow-lg'
                                                : 'text-gray-400 hover:text-white'
                                            }`}
                                    >
                                        <LinkIcon className="h-4 w-4" /> URL Link
                                    </button>
                                    <button
                                        onClick={() => setSubmissionType('file')}
                                        className={`flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all ${submissionType === 'file'
                                                ? 'bg-primary text-white shadow-lg'
                                                : 'text-gray-400 hover:text-white'
                                            }`}
                                    >
                                        <UploadCloud className="h-4 w-4" /> File Upload
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">

                                    {/* 2. Primary Input */}
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={submissionType}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                        >
                                            {submissionType === 'link' ? (
                                                <div className="space-y-2">
                                                    <Label htmlFor="url">External Link URL</Label>
                                                    <div className="relative">
                                                        <LinkIcon className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                                                        <Input
                                                            id="url"
                                                            placeholder="https://github.com/username/project"
                                                            className="pl-10 bg-black/40 border-white/10 h-12 text-white focus:border-primary/50"
                                                            value={linkUrl}
                                                            onChange={(e) => setLinkUrl(e.target.value)}
                                                            required
                                                        />
                                                    </div>
                                                    <p className="text-xs text-gray-500">Supports GitHub, Figma, Google Drive, etc.</p>
                                                </div>
                                            ) : (
                                                <div className="space-y-2">
                                                    <Label>Upload File</Label>
                                                    <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-primary/50 hover:bg-white/5 transition-colors cursor-pointer relative">
                                                        <input
                                                            type="file"
                                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                                            onChange={handleFileChange}
                                                        />
                                                        <div className="flex flex-col items-center gap-3">
                                                            <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center">
                                                                <FileText className="h-6 w-6 text-gray-400" />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-medium text-white">
                                                                    {file ? file.name : "Click to upload or drag and drop"}
                                                                </p>
                                                                <p className="text-xs text-gray-500 mt-1">
                                                                    Max file size 50MB (PDF, PNG, JPG, ZIP)
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    </AnimatePresence>

                                    {/* 3. Description */}
                                    <div className="space-y-2">
                                        <Label htmlFor="desc">Notes / Description</Label>
                                        <Textarea
                                            id="desc"
                                            placeholder="Provide any additional context for validators..."
                                            className="bg-black/40 border-white/10 min-h-[120px] resize-none focus:border-primary/50"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </div>

                                    {/* 4. Submit CTA */}
                                    <div className="pt-4 border-t border-white/5 mt-8">
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting || (submissionType === 'link' && !linkUrl) || (submissionType === 'file' && !file)}
                                            className="w-full h-14 text-base font-bold bg-white text-black hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] relative overflow-hidden"
                                        >
                                            {isSubmitting ? (
                                                <div className="flex items-center gap-2">
                                                    <Loader2 className="h-5 w-5 animate-spin" />
                                                    Processing...
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    Submit Contribution <ArrowLeft className="h-4 w-4 rotate-180" />
                                                </div>
                                            )}
                                        </Button>
                                        <p className="text-center text-xs text-gray-500 mt-4">
                                            By submitting, you agree to the campaign's terms and IP assignment policies.
                                        </p>
                                    </div>

                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskSubmissionPage;

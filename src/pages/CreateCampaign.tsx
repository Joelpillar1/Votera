import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, ArrowRight, Wallet, CheckCircle2, Rocket, Coins, Calendar, Target, ListChecks, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CreateCampaignProps {
    onBack: () => void;
    onSubmit: (campaignData: any) => void;
}

const CreateCampaign: React.FC<CreateCampaignProps> = ({ onBack, onSubmit }) => {
    const [step, setStep] = useState(1);
    const totalSteps = 4;

    const [formData, setFormData] = useState({
        // Identity
        title: '',
        objective: '',
        category: 'Development', // Content, Social, etc.
        coverImage: null as string | null,

        // Mechanics
        startDate: '',
        endDate: '',
        votingPeriod: '',
        participationCriteria: '',

        // Incentives
        budget: '', // Total Pool
        cpPerTask: '', // CP earned per valid submission

        // Tasks (Detailed)
        tasks: [] as { title: string; desc: string }[]
    });

    const [newTask, setNewTask] = useState({ title: '', desc: '' });

    const nextStep = () => setStep(s => Math.min(s + 1, totalSteps));
    const prevStep = () => setStep(s => Math.max(s - 1, 1));

    const budget = parseFloat(formData.budget) || 0;
    const platformFee = budget * 0.05; // 5% Fee mentioned in PRD
    const netPool = budget - platformFee;

    const handleAddTask = () => {
        if (newTask.title.trim()) {
            setFormData({ ...formData, tasks: [...formData.tasks, newTask] });
            setNewTask({ title: '', desc: '' });
        }
    };

    const steps = [
        { title: "Campaign Identity", subtitle: "Define the visual and core identity.", icon: Target },
        { title: "Mechanics & Rules", subtitle: "Set the timeline and participation criteria.", icon: Calendar },
        { title: "Incentives Engine", subtitle: "Allocate Rewards and CP Fuel.", icon: Coins },
        { title: "Review & Ignite", subtitle: "Final check before protocol launch.", icon: Rocket }
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header / Nav */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <Button variant="ghost" onClick={onBack} className="w-fit text-muted-foreground hover:text-white pl-0 gap-2">
                    <ArrowLeft className="h-4 w-4" /> Cancel Campaign
                </Button>

                {/* Visual Stepper */}
                <div className="flex gap-2">
                    {steps.map((s, i) => (
                        <div
                            key={i}
                            className={`flex items-center justify-center h-8 w-8 rounded-full border text-xs font-bold transition-all ${i + 1 === step ? 'bg-primary text-white border-primary shadow-[0_0_15px_rgba(99,102,241,0.5)]' :
                                i + 1 < step ? 'bg-primary/20 text-primary border-primary/20' :
                                    'bg-white/5 text-gray-500 border-white/10'
                                }`}
                        >
                            {i + 1}
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Sidebar Progress Description */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="glass-panel p-6 border-l-2 border-l-primary">
                        <h2 className="text-xl font-bold text-white mb-2">{steps[step - 1].title}</h2>
                        <p className="text-gray-400 text-sm mb-6 leading-relaxed">{steps[step - 1].subtitle}</p>

                        <div className="space-y-4">
                            {steps.map((s, i) => (
                                <div key={i} className={`flex items-center gap-3 ${i + 1 === step ? 'opacity-100 translate-x-1' : 'opacity-40'} transition-all duration-300`}>
                                    <s.icon className={`h-4 w-4 ${i + 1 <= step ? 'text-primary' : 'text-gray-500'}`} />
                                    <span className="text-sm font-medium text-white">{s.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Preview Mini Card */}
                    <div className="p-4 bg-white/5 rounded-xl border border-white/5 opacity-60 pointer-events-none grayscale hover:grayscale-0 transition-all">
                        <div className="text-xs uppercase text-gray-500 mb-2 font-mono">Card Preview</div>
                        <div className="h-32 bg-black/40 rounded-lg mb-3 flex items-center justify-center text-gray-600">
                            {formData.coverImage ? <img src={formData.coverImage} className="h-full w-full object-cover rounded-lg" /> : <ImageIcon className="h-8 w-8" />}
                        </div>
                        <div className="h-4 bg-white/20 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-white/10 rounded w-1/2"></div>
                    </div>
                </div>

                {/* Right: Main Form Area */}
                <div className="lg:col-span-2">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card className="glass-panel border-white/10 min-h-[500px] flex flex-col">
                                <CardContent className="p-8 space-y-6 flex-1">

                                    {/* STEP 1: IDENTITY */}
                                    {step === 1 && (
                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <Label>Campaign Title</Label>
                                                <Input
                                                    placeholder="e.g. Protocol Governance Reform Q3"
                                                    className="bg-black/20 border-white/10 h-12 text-lg"
                                                    value={formData.title}
                                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Cover Image</Label>
                                                <div className="flex items-center gap-4">
                                                    <div
                                                        className="h-32 w-full md:w-1/2 rounded-lg border-2 border-dashed border-white/20 flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 transition-colors cursor-pointer relative overflow-hidden group"
                                                        onClick={() => document.getElementById('cover-upload')?.click()}
                                                    >
                                                        {formData.coverImage ? (
                                                            <>
                                                                <img src={formData.coverImage} className="h-full w-full object-cover" alt="Preview" />
                                                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                                    <span className="text-xs text-white">Change Image</span>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <ImageIcon className="h-8 w-8 text-gray-400 mb-2" />
                                                                <span className="text-xs text-gray-400">Click to upload cover</span>
                                                            </>
                                                        )}
                                                    </div>
                                                    <input
                                                        id="cover-upload"
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                const reader = new FileReader();
                                                                reader.onloadend = () => {
                                                                    setFormData({ ...formData, coverImage: reader.result as string });
                                                                };
                                                                reader.readAsDataURL(file);
                                                            }
                                                        }}
                                                    />
                                                    <div className="text-xs text-muted-foreground flex-1">
                                                        <p>Recommended: 1600x900px</p>
                                                        <p>Supported: JPG, PNG, WEBP</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label>Category</Label>
                                                    <select
                                                        className="w-full h-10 px-3 rounded-md border border-white/10 bg-black/20 text-white text-sm focus:outline-none focus:border-primary/50"
                                                        value={formData.category}
                                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                    >
                                                        <option>Development</option>
                                                        <option>Content Creation</option>
                                                        <option>Research & Analysis</option>
                                                        <option>Design & Creative</option>
                                                        <option>Community Engagement</option>
                                                    </select>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Organizer Name</Label>
                                                    <Input placeholder="DAO or Personal Name" defaultValue="Voterax Operator" disabled className="bg-white/5 border-white/5 text-gray-500" />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Objective</Label>
                                                <Textarea
                                                    placeholder="What is the core goal of this campaign?"
                                                    className="bg-black/20 border-white/10 min-h-[150px]"
                                                    value={formData.objective}
                                                    onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* STEP 2: MECHANICS */}
                                    {step === 2 && (
                                        <div className="space-y-6">
                                            <div className="grid grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <Label>Start Date</Label>
                                                    <Input type="date" className="bg-black/20 border-white/10" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>End Date</Label>
                                                    <Input type="date" className="bg-black/20 border-white/10" />
                                                </div>
                                            </div>

                                            <div className="space-y-4 pt-4 border-t border-white/10">
                                                <Label className="text-lg text-white">Participation Requirements</Label>
                                                <div className="grid grid-cols-[1fr,150px] gap-2">
                                                    <Input
                                                        placeholder="Task Title (e.g. Design Logo)"
                                                        value={newTask.title}
                                                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                                        onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
                                                        className="bg-black/20 border-white/10"
                                                    />
                                                    <Button variant="secondary" onClick={handleAddTask}>Add Task</Button>
                                                </div>

                                                <div className="space-y-2">
                                                    {formData.tasks.length === 0 ? (
                                                        <div className="text-center py-8 text-sm text-gray-600 border border-dashed border-white/10 rounded-lg">
                                                            No tasks added.
                                                        </div>
                                                    ) : (
                                                        formData.tasks.map((t, i) => (
                                                            <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5">
                                                                <span className="text-sm">{t.title}</span>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className="h-6 w-6 p-0 text-gray-500 hover:text-red-400"
                                                                    onClick={() => {
                                                                        const tasks = [...formData.tasks];
                                                                        tasks.splice(i, 1);
                                                                        setFormData({ ...formData, tasks });
                                                                    }}
                                                                >
                                                                    ×
                                                                </Button>
                                                            </div>
                                                        ))
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* STEP 3: INCENTIVES */}
                                    {step === 3 && (
                                        <div className="space-y-8">
                                            <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 p-6 rounded-xl border border-indigo-500/30">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <Coins className="h-6 w-6 text-yellow-400" />
                                                    <h3 className="text-lg font-bold text-white">Campaign Treasury</h3>
                                                </div>

                                                <div className="space-y-4">
                                                    <div className="space-y-2">
                                                        <Label>Total Bounty Pool (USDC/Tokens)</Label>
                                                        <Input
                                                            type="number"
                                                            className="bg-black/40 border-indigo-500/30 text-2xl font-mono h-14"
                                                            placeholder="0.00"
                                                            value={formData.budget}
                                                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                                        />
                                                        <p className="text-xs text-indigo-300">5% Platform Fee will be deducted automatically.</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <Label>Campaign Points (CP) Fuel</Label>
                                                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="text-sm text-gray-400">CP per Task Completion</span>
                                                        <Input
                                                            className="w-24 bg-black/40 border-white/10 text-right"
                                                            placeholder="100"
                                                            value={formData.cpPerTask}
                                                            onChange={(e) => setFormData({ ...formData, cpPerTask: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className="text-xs text-gray-500 leading-relaxed">
                                                        These points are minted by the protocol and do not come from your treasury.
                                                        They determine the voting power of participants.
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* STEP 4: REVIEW */}
                                    {step === 4 && (
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-4 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                                                <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                                                    <Rocket className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-white">Ready for Launch</h3>
                                                    <p className="text-sm text-gray-400">Review your campaign parameters before igniting the protocol.</p>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="p-4 bg-white/5 rounded-lg">
                                                        <div className="text-xs text-gray-500 uppercase">Title</div>
                                                        <div className="font-medium text-white">{formData.title}</div>
                                                    </div>
                                                    <div className="p-4 bg-white/5 rounded-lg">
                                                        <div className="text-xs text-gray-500 uppercase">Net Bounty</div>
                                                        <div className="font-medium text-primary font-mono">{netPool.toLocaleString()}</div>
                                                    </div>
                                                </div>

                                                <div className="p-4 bg-white/5 rounded-lg">
                                                    <div className="text-xs text-gray-500 uppercase mb-2">Tasks</div>
                                                    <div className="space-y-1">
                                                        {formData.tasks.map((t, i) => (
                                                            <div key={i} className="text-sm text-gray-300 flex items-center gap-2">
                                                                <CheckCircle2 className="h-3 w-3 text-green-500" /> {t.title}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                </CardContent>

                                <CardFooter className="p-8 pt-0 flex justify-between">
                                    {step > 1 ? (
                                        <Button variant="outline" onClick={prevStep} className="border-white/10">Back</Button>
                                    ) : (
                                        <div></div>
                                    )}

                                    {step < totalSteps ? (
                                        <Button onClick={nextStep} className="gap-2">Continue <ArrowRight className="h-4 w-4" /></Button>
                                    ) : (
                                        <Button onClick={() => onSubmit(formData)} className="neon-button gap-2 w-full md:w-auto">
                                            Ignite Protocol <Wallet className="h-4 w-4" />
                                        </Button>
                                    )}
                                </CardFooter>
                            </Card>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default CreateCampaign;

import { ArrowLeft, Clock, MessageSquare, CheckCircle, Download, Share2 } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { useNavigate, useParams } from 'react-router-dom';

export function ProjectDetails() {
    const navigate = useNavigate();
    const { id } = useParams();

    // To avoid unused var lint warning
    console.log('Viewing project:', id);

    // Mock data based on id
    const project = {
        title: 'React E-commerce Dashboard',
        description: 'A fully functional frontend dashboard with charts and data tables for managing an online store. Built with React, Tailwind CSS, and Recharts. The goal was to create a responsive and accessible interface for store owners to track sales, manage inventory, and view customer data seamlessly.',
        status: 'In Progress',
        progress: 65,
        dueDate: 'Oct 15, 2026',
        tags: ['React', 'TypeScript', 'Tailwind', 'Recharts'],
        team: ['Alex Johnson', 'Samson J.'],
        milestones: [
            { id: 1, title: 'Project Initialization', completed: true },
            { id: 2, title: 'UI Mockups & Design System', completed: true },
            { id: 3, title: 'Core Component Development', completed: true },
            { id: 4, title: 'API Integration', completed: false },
            { id: 5, title: 'Testing & Deployment', completed: false },
        ],
        feedback: [
            { id: 1, author: 'Prof. Smith', role: 'Reviewer', text: 'Great progress on the UI. Make sure the charts are responsive on mobile devices.', date: '2 days ago' }
        ]
    };

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <button
                onClick={() => navigate('/student/projects')}
                className="flex items-center gap-2 text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors text-sm font-medium"
            >
                <ArrowLeft className="w-4 h-4" /> Back to Projects
            </button>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl font-extrabold text-text-main-light dark:text-white">{project.title}</h1>
                        <Badge variant="warning">{project.status}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> Due: {project.dueDate}</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" className="gap-2"><Share2 className="w-4 h-4" /> Share</Button>
                    <Button variant="primary" size="sm" className="gap-2"><Download className="w-4 h-4" /> Export</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
                <div className="lg:col-span-2 space-y-8">
                    <Card>
                        <CardContent className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-text-main-light dark:text-white mb-3">Description</h3>
                                <p className="text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                                    {project.description}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-text-main-light dark:text-white mb-3">Media Gallery</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center border border-border-light dark:border-border-dark overflow-hidden group relative">
                                            <span className="text-gray-400">Screenshot {i}</span>
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <Button variant="secondary" size="sm">View</Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-text-main-light dark:text-white mb-3 flex items-center gap-2">
                                    <MessageSquare className="w-5 h-5 text-primary" /> Feedback
                                </h3>
                                <div className="space-y-4">
                                    {project.feedback.map(fb => (
                                        <div key={fb.id} className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-4 border border-border-light dark:border-border-dark">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold text-sm shadow-sm">
                                                        {fb.author.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-text-main-light dark:text-white text-sm">{fb.author} <span className="text-xs font-normal text-text-secondary-light">({fb.role})</span></p>
                                                    </div>
                                                </div>
                                                <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">{fb.date}</span>
                                            </div>
                                            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark pl-11">{fb.text}</p>
                                        </div>
                                    ))}
                                    <div className="pt-2">
                                        <textarea
                                            className="w-full h-24 rounded-2xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark p-4 text-sm focus:ring-2 focus:ring-primary focus:border-transparent resize-none dark:text-white"
                                            placeholder="Add a comment or reply..."
                                        ></textarea>
                                        <div className="flex justify-end mt-2">
                                            <Button size="sm">Post Comment</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-8">
                    <Card>
                        <CardContent className="space-y-6">
                            <div>
                                <h3 className="text-md font-bold text-text-main-light dark:text-white mb-3">Overall Progress</h3>
                                <div className="flex justify-between items-center text-sm mb-2">
                                    <span className="text-text-secondary-light dark:text-text-secondary-dark">Completion</span>
                                    <span className="font-bold text-primary">{project.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2.5">
                                    <div className="bg-primary h-2.5 rounded-full" style={{ width: `${project.progress}%` }}></div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-md font-bold text-text-main-light dark:text-white mb-3">Milestones</h3>
                                <div className="space-y-4">
                                    {project.milestones.map((ms, index) => (
                                        <div key={ms.id} className="flex gap-3">
                                            <div className="flex flex-col items-center">
                                                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${ms.completed ? 'bg-green-100 text-green-500' : 'border-2 border-gray-300 dark:border-gray-600 bg-transparent'}`}>
                                                    {ms.completed && <CheckCircle className="w-5 h-5" />}
                                                </div>
                                                {index !== project.milestones.length - 1 && (
                                                    <div className={`w-0.5 h-full min-h-[1.5rem] mt-1 ${ms.completed ? 'bg-green-200 dark:bg-green-900/30' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
                                                )}
                                            </div>
                                            <div className="pt-0.5">
                                                <p className={`text-sm ${ms.completed ? 'text-text-main-light dark:text-white font-medium' : 'text-text-secondary-light dark:text-text-secondary-dark'}`}>{ms.title}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-md font-bold text-text-main-light dark:text-white mb-3">Tech Stack</h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 bg-primary/20 border border-primary/30 text-primary text-xs font-bold rounded-lg shadow-sm">{tag}</span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-md font-bold text-text-main-light dark:text-white mb-3">Team</h3>
                                <div className="flex flex-col gap-3">
                                    {project.team.map((member, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${member}`} alt={member} className="w-8 h-8 rounded-full bg-gray-100" />
                                            <span className="text-sm font-medium text-text-main-light dark:text-white">{member}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

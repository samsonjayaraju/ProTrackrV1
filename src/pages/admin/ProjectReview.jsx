import { ArrowLeft, ExternalLink, Check, X, Save } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useNavigate, useParams } from 'react-router-dom';

export function ProjectReview() {
    const navigate = useNavigate();
    const { id } = useParams();

    // Handle unused param
    console.log('Admin reviewing project:', id);

    return (
        <div className="space-y-6 max-w-6xl mx-auto">
            <div className="flex justify-between items-center">
                <button
                    onClick={() => navigate('/admin')}
                    className="flex items-center gap-2 text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors text-sm font-medium"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                </button>
                <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="gap-2 text-green-600 border-green-200 hover:bg-green-50"><Check className="w-4 h-4" /> Approve</Button>
                    <Button variant="outline" size="sm" className="gap-2 text-red-600 border-red-200 hover:bg-red-50"><X className="w-4 h-4" /> Request Changes</Button>
                    <Button variant="primary" size="sm" className="gap-2"><Save className="w-4 h-4" /> Save Review</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Project Details */}
                <div className="space-y-6">
                    <Card>
                        <CardContent className="space-y-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h1 className="text-2xl font-bold text-text-main-light dark:text-white">Machine Learning Image Classifier</h1>
                                        <Badge variant="warning">Pending Review</Badge>
                                    </div>
                                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark font-medium">By: Alex Johnson (CS2026-001)</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-text-main-light dark:text-white mb-2">Project Description</h3>
                                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                                    A Convolutional Neural Network (CNN) built with PyTorch to classify images of common household items into 10 categories. Achieved 92% accuracy on the test set. The application includes a React frontend for users to upload images and see the classification results in real-time.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h3 className="text-sm font-bold text-text-main-light dark:text-white mb-2">Tech Stack</h3>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-2 py-1 bg-primary/20 border border-primary/30 text-primary text-xs font-bold rounded-lg shadow-sm">Python</span>
                                        <span className="px-2 py-1 bg-primary/20 border border-primary/30 text-primary text-xs font-bold rounded-lg shadow-sm">PyTorch</span>
                                        <span className="px-2 py-1 bg-primary/20 border border-primary/30 text-primary text-xs font-bold rounded-lg shadow-sm">React</span>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-text-main-light dark:text-white mb-2">Links</h3>
                                    <div className="space-y-2">
                                        <a href="#" className="flex items-center gap-2 text-sm text-primary hover:underline">
                                            <ExternalLink className="w-4 h-4" /> Source Code
                                        </a>
                                        <a href="#" className="flex items-center gap-2 text-sm text-primary hover:underline">
                                            <ExternalLink className="w-4 h-4" /> Live Demo
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-text-main-light dark:text-white mb-3">Media / Screenshots</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center border border-border-light dark:border-border-dark">Architecture Diagram</div>
                                    <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center border border-border-light dark:border-border-dark">Demo Screenshot</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Rubric & Feedback */}
                <div className="space-y-6">
                    <Card>
                        <CardContent className="space-y-6">
                            <h3 className="text-xl font-bold text-text-main-light dark:text-white mb-4">Evaluation Rubric</h3>

                            <div className="space-y-5">
                                {[
                                    { label: 'Technical Implementation', desc: 'Code quality, algorithms, functionality' },
                                    { label: 'Documentation', desc: 'ReadMe, inline comments, architecture diagrams' },
                                    { label: 'Innovation / Complexity', desc: 'Creativity, problem difficulty' },
                                    { label: 'User Interface / Experience', desc: 'Design, usability, accessibility' }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border border-transparent dark:border-border-dark hover:border-border-light dark:hover:border-border-dark">
                                        <div>
                                            <h4 className="font-semibold text-text-main-light dark:text-white text-sm">{item.label}</h4>
                                            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1">{item.desc}</p>
                                        </div>
                                        <div className="flex items-center gap-2 shrink-0">
                                            <Input type="number" min="0" max="100" className="w-20 text-center" defaultValue="85" />
                                            <span className="text-text-secondary-light font-medium">/ 100</span>
                                        </div>
                                    </div>
                                ))}

                                <div className="pt-4 border-t border-border-light dark:border-border-dark">
                                    <div className="flex justify-between items-center px-3">
                                        <h4 className="font-bold text-text-main-light dark:text-white">Total Score</h4>
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl font-extrabold text-primary">85</span>
                                            <span className="text-text-secondary-light font-medium">/ 100</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <h3 className="text-lg font-bold text-text-main-light dark:text-white mb-4">Feedback Comments</h3>
                            <textarea
                                className="w-full h-32 rounded-2xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark p-4 text-sm focus:ring-2 focus:ring-primary focus:border-transparent resize-none dark:text-white"
                                placeholder="Provide detailed feedback for the student to review..."
                            >Solid implementation of the CNN architecture. However, the documentation lacks details on how to set up the local environment and the requirements.txt was missing a few dependencies. Please update the README before final approval.
                            </textarea>
                            <p className="text-xs text-text-secondary-light mt-2 text-right">Student will be notified automatically.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

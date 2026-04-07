import { useState, useEffect } from 'react';
import { ArrowLeft, ExternalLink, Check, X, Save, Loader2 } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useNavigate, useParams } from 'react-router-dom';
import { projectService, reviewService } from '../../services/api';

export function ProjectReview() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [scores, setScores] = useState({
        technical_score: 85,
        documentation_score: 85,
        innovation_score: 85,
        ui_ux_score: 85,
    });
    const [comments, setComments] = useState('');

    useEffect(() => {
        loadProject();
    }, [id]);

    const loadProject = async () => {
        try {
            const res = await projectService.getById(id);
            setProject(res.data.project);
            if (res.data.project.review) {
                const r = res.data.project.review;
                setScores({
                    technical_score: r.technical_score,
                    documentation_score: r.documentation_score,
                    innovation_score: r.innovation_score,
                    ui_ux_score: r.ui_ux_score,
                });
                setComments(r.comments || '');
            }
        } catch (err) {
            console.error('Failed to load project:', err);
        } finally {
            setLoading(false);
        }
    };

    const totalScore = Math.round(
        (scores.technical_score + scores.documentation_score + scores.innovation_score + scores.ui_ux_score) / 4
    );

    const handleSubmitReview = async (status) => {
        setSaving(true);
        setMessage('');
        try {
            await reviewService.submit(id, { ...scores, comments, status });
            setMessage(status === 'approved' ? '✅ Project approved!' : '📝 Changes requested.');
            setTimeout(() => navigate('/admin'), 1500);
        } catch (err) {
            setMessage('❌ ' + (err.response?.data?.error || 'Failed to submit review.'));
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!project) {
        return <div className="text-center py-20 text-text-secondary-light">Project not found.</div>;
    }

    return (
        <div className="space-y-6 max-w-6xl mx-auto">
            <div className="flex justify-between items-center">
                <button onClick={() => navigate('/admin')} className="flex items-center gap-2 text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors text-sm font-medium">
                    <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                </button>
                <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="gap-2 text-green-600 border-green-200 hover:bg-green-50" onClick={() => handleSubmitReview('approved')} disabled={saving}>
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />} Approve
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2 text-red-600 border-red-200 hover:bg-red-50" onClick={() => handleSubmitReview('changes_requested')} disabled={saving}>
                        <X className="w-4 h-4" /> Request Changes
                    </Button>
                </div>
            </div>

            {message && (
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl text-sm font-medium text-text-main-light dark:text-white border border-border-light dark:border-border-dark">
                    {message}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Project Details */}
                <div className="space-y-6">
                    <Card>
                        <CardContent className="space-y-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h1 className="text-2xl font-bold text-text-main-light dark:text-white">{project.title}</h1>
                                        <Badge variant={project.status === 'Completed' ? 'success' : project.status === 'Submitted' ? 'warning' : 'default'}>{project.status}</Badge>
                                    </div>
                                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark font-medium">By: {project.owner_name} ({project.owner_roll || 'N/A'})</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-text-main-light dark:text-white mb-2">Project Description</h3>
                                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                                    {project.description || 'No description provided.'}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h3 className="text-sm font-bold text-text-main-light dark:text-white mb-2">Tech Stack</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {(project.tech_stack || []).map(tag => (
                                            <span key={tag} className="px-2 py-1 bg-primary/20 border border-primary/30 text-primary text-xs font-bold rounded-lg shadow-sm">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-text-main-light dark:text-white mb-2">Links</h3>
                                    <div className="space-y-2">
                                        {project.source_url && (
                                            <a href={project.source_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-primary hover:underline">
                                                <ExternalLink className="w-4 h-4" /> Source Code
                                            </a>
                                        )}
                                        {project.demo_url && (
                                            <a href={project.demo_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-primary hover:underline">
                                                <ExternalLink className="w-4 h-4" /> Live Demo
                                            </a>
                                        )}
                                        {!project.source_url && !project.demo_url && (
                                            <p className="text-sm text-text-secondary-light">No links provided.</p>
                                        )}
                                    </div>
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
                                    { key: 'technical_score', label: 'Technical Implementation', desc: 'Code quality, algorithms, functionality' },
                                    { key: 'documentation_score', label: 'Documentation', desc: 'ReadMe, inline comments, architecture diagrams' },
                                    { key: 'innovation_score', label: 'Innovation / Complexity', desc: 'Creativity, problem difficulty' },
                                    { key: 'ui_ux_score', label: 'User Interface / Experience', desc: 'Design, usability, accessibility' }
                                ].map((item) => (
                                    <div key={item.key} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border border-transparent dark:border-border-dark hover:border-border-light dark:hover:border-border-dark">
                                        <div>
                                            <h4 className="font-semibold text-text-main-light dark:text-white text-sm">{item.label}</h4>
                                            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1">{item.desc}</p>
                                        </div>
                                        <div className="flex items-center gap-2 shrink-0">
                                            <Input
                                                type="number"
                                                min="0"
                                                max="100"
                                                className="w-20 text-center"
                                                value={scores[item.key]}
                                                onChange={(e) => setScores(s => ({ ...s, [item.key]: parseInt(e.target.value) || 0 }))}
                                            />
                                            <span className="text-text-secondary-light font-medium">/ 100</span>
                                        </div>
                                    </div>
                                ))}

                                <div className="pt-4 border-t border-border-light dark:border-border-dark">
                                    <div className="flex justify-between items-center px-3">
                                        <h4 className="font-bold text-text-main-light dark:text-white">Total Score</h4>
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl font-extrabold text-primary">{totalScore}</span>
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
                                value={comments}
                                onChange={(e) => setComments(e.target.value)}
                            ></textarea>
                            <p className="text-xs text-text-secondary-light mt-2 text-right">Student will be notified automatically.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Clock, MessageSquare, CheckCircle, Download, Share2, Plus, Loader2, Trash2, Image as ImageIcon, FileText } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { projectService, milestoneService, feedbackService, uploadService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export function ProjectDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useAuth();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [commentText, setCommentText] = useState('');
    const [posting, setPosting] = useState(false);
    const [newMilestone, setNewMilestone] = useState('');
    const [addingMilestone, setAddingMilestone] = useState(false);
    const [uploadingMedia, setUploadingMedia] = useState(false);
    const mediaInputRef = useRef(null);

    useEffect(() => {
        loadProject();
    }, [id]);

    const loadProject = async () => {
        try {
            const res = await projectService.getById(id);
            setProject(res.data.project);
        } catch (err) {
            console.error('Failed to load project:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleMilestone = async (milestoneId) => {
        try {
            const res = await milestoneService.toggle(milestoneId);
            setProject(prev => ({
                ...prev,
                progress: res.data.progress,
                milestones: prev.milestones.map(m => m.id === milestoneId ? { ...m, completed: res.data.milestone.completed } : m)
            }));
        } catch (err) {
            console.error('Failed to toggle milestone:', err);
        }
    };

    const handleAddMilestone = async (e) => {
        e.preventDefault();
        if (!newMilestone.trim()) return;
        setAddingMilestone(true);
        try {
            const res = await milestoneService.create(id, newMilestone.trim());
            setProject(prev => ({ ...prev, milestones: [...prev.milestones, res.data.milestone] }));
            setNewMilestone('');
        } catch (err) {
            console.error('Failed to add milestone:', err);
        } finally {
            setAddingMilestone(false);
        }
    };

    const handlePostComment = async (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;
        setPosting(true);
        try {
            const res = await feedbackService.create(id, commentText.trim());
            setProject(prev => ({ ...prev, feedback: [res.data.feedback, ...prev.feedback] }));
            setCommentText('');
        } catch (err) {
            console.error('Failed to post comment:', err);
        } finally {
            setPosting(false);
        }
    };

    const handleUploadMedia = async (e) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        setUploadingMedia(true);
        try {
            const res = await uploadService.uploadProjectMedia(id, files);
            setProject(prev => ({
                ...prev,
                media: [...(res.data.media || []), ...(prev.media || [])],
            }));
        } catch (err) {
            console.error('Failed to upload media:', err);
        } finally {
            setUploadingMedia(false);
            if (mediaInputRef.current) mediaInputRef.current.value = '';
        }
    };

    const handleDeleteMedia = async (mediaId) => {
        try {
            await uploadService.deleteMedia(mediaId);
            setProject(prev => ({
                ...prev,
                media: (prev.media || []).filter(m => m.id !== mediaId),
            }));
        } catch (err) {
            console.error('Failed to delete media:', err);
        }
    };

    const timeAgo = (dateStr) => {
        const diff = Date.now() - new Date(dateStr).getTime();
        const hours = Math.floor(diff / 3600000);
        if (hours < 1) return 'Just now';
        if (hours < 24) return `${hours}h ago`;
        const days = Math.floor(hours / 24);
        return days === 1 ? 'Yesterday' : `${days} days ago`;
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

    const dueDate = project.due_date ? new Date(project.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'No due date';
    const canManageMedia = user?.role === 'admin' || user?.id === project.user_id;

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
                        <Badge variant={project.status === 'Completed' ? 'success' : project.status === 'In Progress' ? 'warning' : project.status === 'Submitted' ? 'info' : 'default'}>{project.status}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> Due: {dueDate}</span>
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
                                    {project.description || 'No description provided.'}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-text-main-light dark:text-white mb-3 flex items-center gap-2">
                                    <MessageSquare className="w-5 h-5 text-primary" /> Feedback ({project.feedback?.length || 0})
                                </h3>
                                <div className="space-y-4">
                                    {project.feedback?.map(fb => (
                                        <div key={fb.id} className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-4 border border-border-light dark:border-border-dark">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold text-sm shadow-sm">
                                                        {fb.author_name?.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-text-main-light dark:text-white text-sm">{fb.author_name} <span className="text-xs font-normal text-text-secondary-light">({fb.author_role})</span></p>
                                                    </div>
                                                </div>
                                                <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">{timeAgo(fb.created_at)}</span>
                                            </div>
                                            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark pl-11">{fb.text}</p>
                                        </div>
                                    ))}
                                    <form onSubmit={handlePostComment} className="pt-2">
                                        <textarea
                                            className="w-full h-24 rounded-2xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark p-4 text-sm focus:ring-2 focus:ring-primary focus:border-transparent resize-none dark:text-white"
                                            placeholder="Add a comment or reply..."
                                            value={commentText}
                                            onChange={(e) => setCommentText(e.target.value)}
                                        ></textarea>
                                        <div className="flex justify-end mt-2">
                                            <Button type="submit" size="sm" disabled={posting || !commentText.trim()}>
                                                {posting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Post Comment'}
                                            </Button>
                                        </div>
                                    </form>
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
                                    <div className="bg-primary h-2.5 rounded-full transition-all" style={{ width: `${project.progress}%` }}></div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-md font-bold text-text-main-light dark:text-white mb-3">Milestones</h3>
                                <div className="space-y-4">
                                    {project.milestones?.map((ms, index) => (
                                        <div key={ms.id} className="flex gap-3">
                                            <div className="flex flex-col items-center">
                                                <button
                                                    onClick={() => handleToggleMilestone(ms.id)}
                                                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 cursor-pointer transition-colors ${ms.completed ? 'bg-green-100 text-green-500' : 'border-2 border-gray-300 dark:border-gray-600 bg-transparent hover:border-primary'}`}
                                                >
                                                    {ms.completed && <CheckCircle className="w-5 h-5" />}
                                                </button>
                                                {index !== project.milestones.length - 1 && (
                                                    <div className={`w-0.5 h-full min-h-[1.5rem] mt-1 ${ms.completed ? 'bg-green-200 dark:bg-green-900/30' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
                                                )}
                                            </div>
                                            <div className="pt-0.5">
                                                <p className={`text-sm ${ms.completed ? 'text-text-main-light dark:text-white font-medium line-through opacity-60' : 'text-text-secondary-light dark:text-text-secondary-dark'}`}>{ms.title}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <form onSubmit={handleAddMilestone} className="flex gap-2 mt-4">
                                    <input
                                        className="flex-1 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-card-dark px-3 py-2 text-sm dark:text-white outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="Add milestone..."
                                        value={newMilestone}
                                        onChange={(e) => setNewMilestone(e.target.value)}
                                    />
                                    <Button type="submit" size="sm" disabled={addingMilestone || !newMilestone.trim()}>
                                        {addingMilestone ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                                    </Button>
                                </form>
                            </div>

                            <div>
                                <h3 className="text-md font-bold text-text-main-light dark:text-white mb-3">Tech Stack</h3>
                                <div className="flex flex-wrap gap-2">
                                    {(project.tech_stack || []).map(tag => (
                                        <span key={tag} className="px-3 py-1 bg-primary/20 border border-primary/30 text-primary text-xs font-bold rounded-lg shadow-sm">{tag}</span>
                                    ))}
                                    {(!project.tech_stack || project.tech_stack.length === 0) && (
                                        <span className="text-sm text-text-secondary-light">No tech stack specified.</span>
                                    )}
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-md font-bold text-text-main-light dark:text-white">Project Media</h3>
                                    {canManageMedia && (
                                        <>
                                            <input
                                                ref={mediaInputRef}
                                                type="file"
                                                accept="image/*,application/pdf"
                                                multiple
                                                onChange={handleUploadMedia}
                                                className="hidden"
                                            />
                                            <Button type="button" size="sm" onClick={() => mediaInputRef.current?.click()} disabled={uploadingMedia}>
                                                {uploadingMedia ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                                            </Button>
                                        </>
                                    )}
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {(project.media || []).length === 0 && (
                                        <p className="text-sm text-text-secondary-light col-span-2">No media uploaded yet.</p>
                                    )}
                                    {(project.media || []).map((item) => (
                                        <div key={item.id} className="relative border border-border-light dark:border-border-dark rounded-2xl overflow-hidden bg-white dark:bg-card-dark">
                                            {item.file_type?.startsWith('image/') ? (
                                                <a href={item.file_url} target="_blank" rel="noreferrer">
                                                    <img src={item.file_url} alt={item.file_name} className="h-24 w-full object-cover" />
                                                </a>
                                            ) : (
                                                <a href={item.file_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 p-3">
                                                    <FileText className="w-4 h-4 text-primary" />
                                                    <span className="text-xs text-text-secondary-light truncate">{item.file_name}</span>
                                                </a>
                                            )}
                                            {canManageMedia && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteMedia(item.id)}
                                                    className="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-white border border-border-light text-red-600"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs text-text-secondary-light mt-2 flex items-center gap-2">
                                    <ImageIcon className="w-3.5 h-3.5" /> JPG/PNG/GIF/WEBP or PDF (max 20MB each)
                                </p>
                            </div>

                            <div>
                                <h3 className="text-md font-bold text-text-main-light dark:text-white mb-3">Team</h3>
                                <div className="flex flex-col gap-3">
                                    {project.team?.map((member) => (
                                        <div key={member.id} className="flex items-center gap-3">
                                            <img
                                                src={member.avatar_url ? member.avatar_url : `https://api.dicebear.com/7.x/notionists/svg?seed=${member.full_name}`}
                                                alt={member.full_name}
                                                className="w-8 h-8 rounded-full bg-gray-100"
                                            />
                                            <span className="text-sm font-medium text-text-main-light dark:text-white">{member.full_name}</span>
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

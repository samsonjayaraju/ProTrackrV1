import { useState, useEffect } from 'react';
import { Search, Filter, Folder, MoreVertical, Calendar, Plus, X, Loader2 } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useNavigate } from 'react-router-dom';
import { projectService } from '../../services/api';

export function Projects() {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [creating, setCreating] = useState(false);
    const [newProject, setNewProject] = useState({ title: '', description: '', category: 'Development', due_date: '', tech_stack: '' });
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        try {
            const res = await projectService.getAll();
            setProjects(res.data.projects);
        } catch (err) {
            console.error('Failed to load projects:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateProject = async (e) => {
        e.preventDefault();
        const errs = {};
        if (!newProject.title.trim()) errs.title = 'Title is required';
        if (Object.keys(errs).length > 0) { setFormErrors(errs); return; }

        setCreating(true);
        try {
            const techArray = newProject.tech_stack ? newProject.tech_stack.split(',').map(t => t.trim()).filter(Boolean) : [];
            await projectService.create({
                ...newProject,
                tech_stack: techArray,
            });
            setShowModal(false);
            setNewProject({ title: '', description: '', category: 'Development', due_date: '', tech_stack: '' });
            setFormErrors({});
            loadProjects();
        } catch (err) {
            console.error('Failed to create project:', err);
        } finally {
            setCreating(false);
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

    const filtered = projects
        .filter(p => filter === 'All' || p.category === filter)
        .filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-2xl font-bold text-text-main-light dark:text-white">My Projects</h2>
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                    <Input
                        icon={<Search className="w-5 h-5" />}
                        placeholder="Search projects..."
                        className="w-full md:w-64 bg-white dark:bg-card-dark"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="flex items-center gap-2 bg-white dark:bg-card-dark px-4 py-2 rounded-2xl border border-border-light dark:border-border-dark h-12">
                        <Filter className="w-5 h-5 text-text-secondary-light dark:text-text-secondary-dark" />
                        <select
                            className="bg-transparent border-none text-sm text-text-main-light dark:text-white focus:ring-0 outline-none"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="All">All Categories</option>
                            <option value="Design">Design</option>
                            <option value="Development">Development</option>
                            <option value="Branding">Branding</option>
                            <option value="Research">Research</option>
                        </select>
                    </div>
                    <Button onClick={() => setShowModal(true)} className="gap-2"><Plus className="w-4 h-4" /> New Project</Button>
                </div>
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-16">
                    <Folder className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-text-main-light dark:text-white mb-2">No projects found</h3>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Create your first project to get started!</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map(project => (
                    <Card key={project.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/student/projects/${project.id}`)}>
                        <CardContent className="flex flex-col h-full gap-4 p-6">
                            <div className="flex justify-between items-start">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-primary">
                                    <Folder className="w-6 h-6" />
                                </div>
                                <button className="text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-full transition-colors" onClick={(e) => e.stopPropagation()}>
                                    <MoreVertical className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="mt-2">
                                <h3 className="text-lg font-bold text-text-main-light dark:text-white mb-1">{project.title}</h3>
                                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark line-clamp-2">{project.description}</p>
                            </div>

                            <div className="mt-auto pt-4 space-y-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-text-main-light dark:text-white font-medium">{project.progress}% completed</span>
                                    <Badge
                                        variant={
                                            project.status === 'Completed' ? 'success' :
                                                project.status === 'In Progress' ? 'warning' :
                                                    project.status === 'Submitted' ? 'info' : 'default'
                                        }
                                    >
                                        {project.status}
                                    </Badge>
                                </div>
                                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5">
                                    <div
                                        className={`h-1.5 rounded-full ${project.status === 'Completed' ? 'bg-green-500' : 'bg-primary'}`}
                                        style={{ width: `${project.progress}%` }}
                                    ></div>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-text-secondary-light dark:text-text-secondary-dark pt-2 border-t border-border-light dark:border-border-dark">
                                    <Calendar className="w-4 h-4" />
                                    <span>Last updated: {timeAgo(project.updated_at)}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Create Project Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-card-light dark:bg-card-dark rounded-3xl p-8 w-full max-w-lg border-2 border-gray-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-text-main-light dark:text-white">New Project</h3>
                            <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleCreateProject} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-text-main-light dark:text-white mb-2">Title *</label>
                                <Input value={newProject.title} onChange={(e) => { setNewProject(p => ({ ...p, title: e.target.value })); setFormErrors({}); }} placeholder="My Awesome Project" />
                                {formErrors.title && <p className="text-xs text-red-500 mt-1">{formErrors.title}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-main-light dark:text-white mb-2">Description</label>
                                <textarea className="w-full h-24 rounded-2xl border border-border-light dark:border-border-dark bg-white dark:bg-card-dark p-4 text-sm resize-none dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none" value={newProject.description} onChange={(e) => setNewProject(p => ({ ...p, description: e.target.value }))} placeholder="Describe your project..." />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-text-main-light dark:text-white mb-2">Category</label>
                                    <select className="w-full h-12 rounded-2xl border border-border-light dark:border-border-dark bg-white dark:bg-card-dark px-4 text-sm text-text-main-light dark:text-white outline-none" value={newProject.category} onChange={(e) => setNewProject(p => ({ ...p, category: e.target.value }))}>
                                        <option value="Development">Development</option>
                                        <option value="Design">Design</option>
                                        <option value="Branding">Branding</option>
                                        <option value="Research">Research</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-main-light dark:text-white mb-2">Due Date</label>
                                    <Input type="date" value={newProject.due_date} onChange={(e) => setNewProject(p => ({ ...p, due_date: e.target.value }))} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-main-light dark:text-white mb-2">Tech Stack (comma separated)</label>
                                <Input value={newProject.tech_stack} onChange={(e) => setNewProject(p => ({ ...p, tech_stack: e.target.value }))} placeholder="React, Node.js, MySQL" />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <Button type="button" variant="outline" className="flex-1" onClick={() => setShowModal(false)}>Cancel</Button>
                                <Button type="submit" className="flex-1" disabled={creating}>
                                    {creating ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Project'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

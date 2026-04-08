import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Briefcase, Mail, MapPin, Link as LinkIcon, Download, Share2, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { projectService, userService } from '../../services/api';

export function StudentPortfolio() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;
        Promise.all([
            userService.getById(id),
            projectService.getAll(),
        ])
            .then(([userRes, projectsRes]) => {
                if (!active) return;
                setUser(userRes.data.user);
                const allProjects = projectsRes.data.projects || [];
                setProjects(allProjects.filter(p => p.user_id === parseInt(id, 10) && p.status === 'Completed'));
            })
            .catch(err => console.error('Failed to load student portfolio:', err))
            .finally(() => active && setLoading(false));

        return () => { active = false; };
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!user) {
        return <div className="text-center py-20 text-text-secondary-light">Student not found.</div>;
    }

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <button
                onClick={() => navigate('/admin/students')}
                className="flex items-center gap-2 text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors text-sm font-medium"
            >
                <ArrowLeft className="w-4 h-4" /> Back to Students
            </button>

            {/* Hero Section */}
            <div className="relative rounded-3xl border-2 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden bg-primary h-64 md:h-80">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent/90"></div>
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white/20 blur-3xl"></div>
                <div className="absolute bottom-0 left-1/4 w-60 h-60 rounded-full bg-white/10 blur-3xl"></div>
            </div>

            <div className="px-4 sm:px-8 -mt-24 relative z-10">
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-end">
                    <div className="relative">
                        <img
                            src={user?.avatar_url ? user.avatar_url : `https://api.dicebear.com/7.x/notionists/svg?seed=${user?.full_name || 'Student'}&backgroundColor=b6e3f4`}
                            alt="Student"
                            className="w-32 h-32 md:w-40 md:h-40 rounded-3xl border-4 border-background-light dark:border-background-dark bg-white"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-background-light dark:border-background-dark"></div>
                    </div>

                    <div className="flex-1 pb-2">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-text-main-light dark:text-white mb-2">{user?.full_name}</h1>
                        <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark flex items-center gap-2">
                            <Briefcase className="w-5 h-5" /> {user?.department || 'Student'}
                        </p>
                    </div>

                    <div className="flex gap-3 pb-2 w-full md:w-auto">
                        <Button variant="outline" className="flex-1 md:flex-none gap-2"><Share2 className="w-4 h-4" /> Share</Button>
                        <Button className="flex-1 md:flex-none gap-2"><Download className="w-4 h-4" /> Resume</Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="space-y-8">
                    <Card>
                        <CardContent className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-text-main-light dark:text-white mb-3">About Me</h3>
                                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                                    {user?.bio || 'No bio provided yet.'}
                                </p>
                            </div>

                            <div className="space-y-3">
                                {user?.location && (
                                    <div className="flex items-center gap-3 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                                        <MapPin className="w-4 h-4 text-primary" /> {user.location}
                                    </div>
                                )}
                                {user?.email && (
                                    <div className="flex items-center gap-3 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                                        <Mail className="w-4 h-4 text-primary" /> {user.email}
                                    </div>
                                )}
                                {user?.github_url && (
                                    <div className="flex items-center gap-3 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                                        <LinkIcon className="w-4 h-4 text-primary" /> {user.github_url}
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Completed Projects */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="text-xl font-bold text-text-main-light dark:text-white">Completed Projects ({projects.length})</h3>
                    </div>

                    {projects.length === 0 && (
                        <div className="text-center py-16">
                            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">No completed projects yet.</p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {projects.map((project) => (
                            <Card key={project.id} className="overflow-hidden group hover:shadow-md transition-shadow cursor-pointer">
                                <div className="aspect-video bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
                                    <div className="absolute inset-0 flex items-center justify-center text-text-secondary-light">
                                        {project.title}
                                    </div>
                                    <div className="absolute top-4 right-4">
                                        <Badge variant="success">Completed</Badge>
                                    </div>
                                </div>
                                <CardContent className="p-5">
                                    <h4 className="font-bold text-lg text-text-main-light dark:text-white mb-2 group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h4>
                                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-4 line-clamp-2">
                                        {project.description || 'No description.'}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {(project.tech_stack || []).slice(0, 3).map(tag => (
                                            <span key={tag} className="text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark bg-background-light dark:bg-background-dark px-2 py-1 rounded-md">{tag}</span>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

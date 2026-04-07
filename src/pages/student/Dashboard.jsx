import { useState, useEffect } from 'react';
import { Folder, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { statsService } from '../../services/api';

export function Dashboard() {
    const navigate = useNavigate();
    const [stats, setStats] = useState({ totalProjects: 0, completed: 0, inProgress: 0 });
    const [recentActivity, setRecentActivity] = useState([]);
    const [skillDistribution, setSkillDistribution] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        statsService.getStudentStats()
            .then(res => {
                setStats(res.data.stats);
                setRecentActivity(res.data.recentActivity);
                setSkillDistribution(res.data.skillDistribution);
            })
            .catch(err => console.error('Failed to load stats:', err))
            .finally(() => setLoading(false));
    }, []);

    const totalSkills = skillDistribution.reduce((acc, s) => acc + s.count, 0);

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Completed': return <Badge variant="success">Completed</Badge>;
            case 'In Progress': return <Badge variant="warning">In Progress</Badge>;
            case 'Submitted': return <Badge variant="info">Submitted</Badge>;
            default: return <Badge variant="default">Draft</Badge>;
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

    return (
        <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <Card>
                    <CardContent className="flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary border-2 border-gray-900 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            <Folder className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-base text-text-secondary-light dark:text-text-secondary-dark">Total Projects</p>
                            <h3 className="text-2xl font-bold text-text-main-light dark:text-white">{stats.totalProjects}</h3>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-green-400 border-2 border-gray-900 text-green-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            <CheckCircle className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-base text-text-secondary-light dark:text-text-secondary-dark">Completed</p>
                            <h3 className="text-2xl font-bold text-text-main-light dark:text-white">{stats.completed}</h3>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-accent border-2 border-gray-900 text-yellow-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            <Clock className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-base text-text-secondary-light dark:text-text-secondary-dark">In Progress</p>
                            <h3 className="text-2xl font-bold text-text-main-light dark:text-white">{stats.inProgress}</h3>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="flex flex-col gap-5">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-semibold text-text-main-light dark:text-white">Recent Activity</h3>
                            <button onClick={() => navigate('/student/projects')} className="text-sm font-medium text-text-secondary-light hover:text-primary dark:text-text-secondary-dark dark:hover:text-white">See All</button>
                        </div>

                        <div className="flex flex-col gap-4">
                            {recentActivity.length === 0 && (
                                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark py-4 text-center">No projects yet. Create your first project!</p>
                            )}
                            {recentActivity.map(project => (
                                <div key={project.id} onClick={() => navigate(`/student/projects/${project.id}`)} className="flex items-center justify-between rounded-2xl bg-card-light dark:bg-card-dark p-4 shadow-sm transition-colors duration-200 border border-transparent dark:border-border-dark hover:border-border-light dark:hover:border-gray-700 cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary">
                                            <Folder className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-text-main-light dark:text-white">{project.title}</h4>
                                            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Updated {timeAgo(project.updated_at)}</p>
                                        </div>
                                    </div>
                                    {getStatusBadge(project.status)}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Space */}
                <div className="space-y-8">
                    <div className="flex flex-col gap-5">
                        <h3 className="text-xl font-semibold text-text-main-light dark:text-white">Quick Actions</h3>
                        <div className="flex flex-col gap-4">
                            <Button size="lg" className="w-full justify-start shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-primary text-white" onClick={() => navigate('/student/projects')}>
                                <span className="flex-1 text-left py-2">
                                    <p className="font-bold">New Project</p>
                                    <p className="text-xs text-white/80 font-normal">Start a new draft</p>
                                </span>
                                <span>→</span>
                            </Button>

                            <Button size="lg" variant="secondary" className="w-full justify-start rounded-2xl shadow-sm border border-transparent dark:border-border-dark" onClick={() => navigate('/student/portfolio')}>
                                <span className="flex-1 text-left py-2">
                                    <p className="font-bold text-text-main-light dark:text-white">Update Portfolio</p>
                                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark font-normal">Refresh live site</p>
                                </span>
                                <span className="text-text-secondary-light dark:text-text-secondary-dark">→</span>
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-5">
                        <h3 className="text-xl font-semibold text-text-main-light dark:text-white">Skill Focus</h3>
                        <Card>
                            <CardContent>
                                <div className="space-y-4">
                                    {skillDistribution.length === 0 && (
                                        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">No project data yet.</p>
                                    )}
                                    {skillDistribution.map((skill, i) => {
                                        const colors = ['bg-primary', 'bg-[#9C27B0]', 'bg-[#FFD700]', 'bg-green-500'];
                                        const pct = totalSkills > 0 ? Math.round((skill.count / totalSkills) * 100) : 0;
                                        return (
                                            <div key={i}>
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span className="font-medium text-text-main-light dark:text-white">{skill.category || 'Other'}</span>
                                                    <span className="text-text-secondary-light dark:text-text-secondary-dark">{pct}%</span>
                                                </div>
                                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                    <div className={`${colors[i % colors.length]} h-2 rounded-full`} style={{ width: `${pct}%` }}></div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

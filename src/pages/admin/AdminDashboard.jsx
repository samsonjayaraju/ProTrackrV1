import { useState, useEffect } from 'react';
import { Users, FileText, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { statsService } from '../../services/api';

export function AdminDashboard() {
    const navigate = useNavigate();
    const [stats, setStats] = useState({ totalStudents: 0, totalProjects: 0, pendingReviews: 0, completed: 0 });
    const [submissions, setSubmissions] = useState([]);
    const [statusOverview, setStatusOverview] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        statsService.getAdminStats()
            .then(res => {
                setStats(res.data.stats);
                setSubmissions(res.data.recentSubmissions);
                setStatusOverview(res.data.statusOverview);
            })
            .catch(err => console.error('Failed to load admin stats:', err))
            .finally(() => setLoading(false));
    }, []);

    const timeAgo = (dateStr) => {
        const diff = Date.now() - new Date(dateStr).getTime();
        const hours = Math.floor(diff / 3600000);
        if (hours < 1) return 'Just now';
        if (hours < 24) return `${hours}h ago`;
        const days = Math.floor(hours / 24);
        return days === 1 ? 'Yesterday' : `${days} days ago`;
    };

    const getStatusCount = (status) => {
        const s = statusOverview.find(o => o.status === status);
        return s ? s.count : 0;
    };

    const totalAll = statusOverview.reduce((acc, s) => acc + s.count, 0);
    const getStatusPct = (status) => totalAll > 0 ? Math.round((getStatusCount(status) / totalAll) * 100) : 0;

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
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardContent className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl border-2 border-gray-900 bg-primary text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            <Users className="w-7 h-7" />
                        </div>
                        <div>
                            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Total Students</p>
                            <h3 className="text-2xl font-bold text-text-main-light dark:text-white">{stats.totalStudents}</h3>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl border-2 border-gray-900 bg-[#9C27B0] text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            <FileText className="w-7 h-7" />
                        </div>
                        <div>
                            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Total Projects</p>
                            <h3 className="text-2xl font-bold text-text-main-light dark:text-white">{stats.totalProjects}</h3>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl border-2 border-gray-900 bg-accent text-yellow-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            <Clock className="w-7 h-7" />
                        </div>
                        <div>
                            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Pending Reviews</p>
                            <h3 className="text-2xl font-bold text-text-main-light dark:text-white">{stats.pendingReviews}</h3>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl border-2 border-gray-900 bg-green-400 text-green-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            <CheckCircle className="w-7 h-7" />
                        </div>
                        <div>
                            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Completed</p>
                            <h3 className="text-2xl font-bold text-text-main-light dark:text-white">{stats.completed}</h3>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-text-main-light dark:text-white">Recent Submissions for Review</h3>
                    </div>

                    <Card>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-text-main-light dark:text-white">
                                <thead className="bg-gray-50 dark:bg-gray-800/50 text-text-secondary-light dark:text-text-secondary-dark font-medium border-b border-border-light dark:border-border-dark">
                                    <tr>
                                        <th className="px-6 py-4 rounded-tl-3xl">Project Title</th>
                                        <th className="px-6 py-4">Student</th>
                                        <th className="px-6 py-4">Submitted</th>
                                        <th className="px-6 py-4 text-right rounded-tr-3xl">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border-light dark:divide-border-dark">
                                    {submissions.length === 0 && (
                                        <tr><td colSpan={4} className="px-6 py-8 text-center text-text-secondary-light">No pending submissions.</td></tr>
                                    )}
                                    {submissions.map((sub) => (
                                        <tr key={sub.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                            <td className="px-6 py-4 font-medium">{sub.title}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <img
                                                        src={sub.avatar_url ? sub.avatar_url : `https://api.dicebear.com/7.x/notionists/svg?seed=${sub.student_name}`}
                                                        alt=""
                                                        className="w-6 h-6 rounded-full bg-gray-100"
                                                    />
                                                    {sub.student_name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-text-secondary-light dark:text-text-secondary-dark">{timeAgo(sub.updated_at)}</td>
                                            <td className="px-6 py-4 text-right">
                                                <Button variant="outline" size="sm" onClick={() => navigate(`/admin/projects/${sub.id}`)}>Review</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>

                <div className="space-y-8">
                    <div className="flex flex-col gap-5">
                        <h3 className="text-xl font-semibold text-text-main-light dark:text-white">Quick Actions</h3>
                        <div className="flex flex-col gap-4">
                            <Button size="lg" className="w-full justify-start shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-primary text-white" onClick={() => navigate('/admin/reports')}>
                                <span className="flex-1 text-left py-2">
                                    <p className="font-bold">Generate Report</p>
                                    <p className="text-xs text-white/80 font-normal">Monthly performance</p>
                                </span>
                                <span>→</span>
                            </Button>
                            <Button size="lg" variant="secondary" className="w-full justify-start rounded-2xl shadow-sm border border-transparent dark:border-border-dark" onClick={() => navigate('/admin/students')}>
                                <span className="flex-1 text-left py-2">
                                    <p className="font-bold text-text-main-light dark:text-white">Manage Students</p>
                                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark font-normal">Add or view profiles</p>
                                </span>
                                <span className="text-text-secondary-light dark:text-text-secondary-dark">→</span>
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-5">
                        <h3 className="text-xl font-semibold text-text-main-light dark:text-white">Project Status Overview</h3>
                        <Card>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="font-medium text-text-main-light dark:text-white">Completed</span>
                                            <span className="text-text-secondary-light dark:text-text-secondary-dark">{getStatusCount('Completed')}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                            <div className="bg-green-500 h-2 rounded-full" style={{ width: `${getStatusPct('Completed')}%` }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="font-medium text-text-main-light dark:text-white">In Progress</span>
                                            <span className="text-text-secondary-light dark:text-text-secondary-dark">{getStatusCount('In Progress')}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                            <div className="bg-primary h-2 rounded-full" style={{ width: `${getStatusPct('In Progress')}%` }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="font-medium text-text-main-light dark:text-white">Submitted</span>
                                            <span className="text-text-secondary-light dark:text-text-secondary-dark">{getStatusCount('Submitted')}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${getStatusPct('Submitted')}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

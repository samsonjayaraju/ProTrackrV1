import { Users, FileText, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

export function AdminDashboard() {
    const navigate = useNavigate();

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
                            <h3 className="text-2xl font-bold text-text-main-light dark:text-white">248</h3>
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
                            <h3 className="text-2xl font-bold text-text-main-light dark:text-white">856</h3>
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
                            <h3 className="text-2xl font-bold text-text-main-light dark:text-white">32</h3>
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
                            <h3 className="text-2xl font-bold text-text-main-light dark:text-white">614</h3>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-text-main-light dark:text-white">Recent Submissions for Review</h3>
                        <a href="#" className="text-sm font-medium text-text-secondary-light hover:text-primary dark:text-text-secondary-dark dark:hover:text-white">View All Pending</a>
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
                                    {[
                                        { id: '101', title: 'Machine Learning Image Classifier', student: 'Alex Johnson', date: '2 hours ago' },
                                        { id: '102', title: 'React Final Project', student: 'Samson Jayaraju', date: '5 hours ago' },
                                        { id: '103', title: 'Database Design Document', student: 'Maria Garcia', date: '1 day ago' },
                                        { id: '104', title: 'iOS App Prototype', student: 'James Smith', date: '2 days ago' },
                                    ].map((sub) => (
                                        <tr key={sub.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                            <td className="px-6 py-4 font-medium">{sub.title}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${sub.student}`} alt="" className="w-6 h-6 rounded-full bg-gray-100" />
                                                    {sub.student}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-text-secondary-light dark:text-text-secondary-dark">{sub.date}</td>
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

                {/* Sidebar Space */}
                <div className="space-y-8">
                    <div className="flex flex-col gap-5">
                        <h3 className="text-xl font-semibold text-text-main-light dark:text-white">Quick Actions</h3>
                        <div className="flex flex-col gap-4">
                            <Button size="lg" className="w-full justify-start shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-primary text-white">
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
                                            <span className="text-text-secondary-light dark:text-text-secondary-dark">614</span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="font-medium text-text-main-light dark:text-white">In Progress</span>
                                            <span className="text-text-secondary-light dark:text-text-secondary-dark">210</span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                            <div className="bg-primary h-2 rounded-full" style={{ width: '25%' }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="font-medium text-text-main-light dark:text-white">Pending Review</span>
                                            <span className="text-text-secondary-light dark:text-text-secondary-dark">32</span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '5%' }}></div>
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

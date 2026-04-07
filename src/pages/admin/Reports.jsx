import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Presentation, Download } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { statsService } from '../../services/api';

export function Reports() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        statsService.getReports()
            .then(res => setData(res.data))
            .catch(err => console.error('Failed to load reports:', err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    const byDepartment = data?.byDepartment || [];
    const trend = data?.trend || [];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-2xl font-bold text-text-main-light dark:text-white">Analytics & Reports</h2>
                <div className="flex gap-3">
                    <select className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl px-4 py-2 text-sm text-text-main-light dark:text-white outline-none">
                        <option>Fall 2026 Semester</option>
                        <option>Spring 2026 Semester</option>
                        <option>All Time</option>
                    </select>
                    <Button variant="primary" className="gap-2"><Download className="w-4 h-4" /> Export PDF</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardContent className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary border-2 border-gray-900 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            <BarChart3 className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Avg. Completion Rate</p>
                            <div className="flex items-end gap-2">
                                <h3 className="text-2xl font-bold text-text-main-light dark:text-white">{data?.avgCompletion || 0}%</h3>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#9C27B0] border-2 border-gray-900 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            <Presentation className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Total Projects Submitted</p>
                            <div className="flex items-end gap-2">
                                <h3 className="text-2xl font-bold text-text-main-light dark:text-white">{data?.totalSubmitted || 0}</h3>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-400 border-2 border-gray-900 text-green-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Avg Feedback Time</p>
                            <div className="flex items-end gap-2">
                                <h3 className="text-2xl font-bold text-text-main-light dark:text-white">{data?.avgReviewTime || '0'} Days</h3>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                    <CardContent>
                        <h3 className="text-lg font-bold text-text-main-light dark:text-white mb-6">Projects by Department</h3>
                        <div className="h-80 w-full">
                            {byDepartment.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={byDepartment} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#DFEAF2" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#718EBF', fontSize: 12 }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#718EBF', fontSize: 12 }} />
                                        <RechartsTooltip cursor={{ fill: '#F5F7FA' }} contentStyle={{ borderRadius: '16px', border: '2px solid #111827', boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)' }} />
                                        <Bar dataKey="completed" name="Completed" stackId="a" fill="#FF6B35" radius={[0, 0, 4, 4]} barSize={40} />
                                        <Bar dataKey="inProgress" name="In Progress" stackId="a" fill="#9C27B0" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="flex items-center justify-center h-full text-text-secondary-light">No department data available.</div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <h3 className="text-lg font-bold text-text-main-light dark:text-white mb-6">Submissions Trend</h3>
                        <div className="h-80 w-full">
                            {trend.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={trend} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#DFEAF2" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#718EBF', fontSize: 12 }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#718EBF', fontSize: 12 }} />
                                        <RechartsTooltip contentStyle={{ borderRadius: '16px', border: '2px solid #111827', boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)' }} />
                                        <Line type="monotone" dataKey="projects" name="Total Submissions" stroke="#FFD700" strokeWidth={4} dot={{ r: 4, fill: '#FFD700', strokeWidth: 2, stroke: '#111827' }} activeDot={{ r: 6 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="flex items-center justify-center h-full text-text-secondary-light">No trend data available yet.</div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

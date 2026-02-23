import { Folder, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export function Dashboard() {
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
                            <h3 className="text-2xl font-bold text-text-main-light dark:text-white">12</h3>
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
                            <h3 className="text-2xl font-bold text-text-main-light dark:text-white">8</h3>
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
                            <h3 className="text-2xl font-bold text-text-main-light dark:text-white">4</h3>
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
                            <a href="#" className="text-sm font-medium text-text-secondary-light hover:text-primary dark:text-text-secondary-dark dark:hover:text-white">See All</a>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between rounded-2xl bg-card-light dark:bg-card-dark p-4 shadow-sm transition-colors duration-200 border border-transparent dark:border-border-dark hover:border-border-light dark:hover:border-gray-700">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#9C27B0]/20 text-[#9C27B0]">
                                        <Folder className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-text-main-light dark:text-white">UX Case Study: FinTech App</h4>
                                        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Updated 2 hours ago</p>
                                    </div>
                                </div>
                                <Badge variant="success">Completed</Badge>
                            </div>

                            <div className="flex items-center justify-between rounded-2xl bg-card-light dark:bg-card-dark p-4 shadow-sm transition-colors duration-200 border border-transparent dark:border-border-dark hover:border-border-light dark:hover:border-gray-700">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary">
                                        <Folder className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-text-main-light dark:text-white">React E-commerce Dashboard</h4>
                                        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Updated yesterday</p>
                                    </div>
                                </div>
                                <Badge variant="warning">In Progress</Badge>
                            </div>

                            <div className="flex items-center justify-between rounded-2xl bg-card-light dark:bg-card-dark p-4 shadow-sm transition-colors duration-200 border border-transparent dark:border-border-dark hover:border-border-light dark:hover:border-gray-700">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                                        <Folder className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-text-main-light dark:text-white">Brand Identity for Cafe</h4>
                                        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Updated 3 days ago</p>
                                    </div>
                                </div>
                                <Badge variant="default">Draft</Badge>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Space */}
                <div className="space-y-8">
                    <div className="flex flex-col gap-5">
                        <h3 className="text-xl font-semibold text-text-main-light dark:text-white">Quick Actions</h3>
                        <div className="flex flex-col gap-4">
                            <Button size="lg" className="w-full justify-start shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-primary text-white">
                                <span className="flex-1 text-left py-2">
                                    <p className="font-bold">New Project</p>
                                    <p className="text-xs text-white/80 font-normal">Start a new draft</p>
                                </span>
                                <span>→</span>
                            </Button>

                            <Button size="lg" variant="secondary" className="w-full justify-start rounded-2xl shadow-sm border border-transparent dark:border-border-dark">
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
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="font-medium text-text-main-light dark:text-white">UI/UX</span>
                                            <span className="text-text-secondary-light dark:text-text-secondary-dark">35%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                            <div className="bg-primary h-2 rounded-full" style={{ width: '35%' }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="font-medium text-text-main-light dark:text-white">Frontend</span>
                                            <span className="text-text-secondary-light dark:text-text-secondary-dark">25%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                            <div className="bg-[#9C27B0] h-2 rounded-full" style={{ width: '25%' }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="font-medium text-text-main-light dark:text-white">Research</span>
                                            <span className="text-text-secondary-light dark:text-text-secondary-dark">25%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                            <div className="bg-[#FFD700] h-2 rounded-full" style={{ width: '25%' }}></div>
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

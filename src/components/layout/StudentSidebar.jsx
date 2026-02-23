import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FolderOpen, UserCircle, Award, Settings, LogOut } from 'lucide-react';
import clsx from 'clsx';

const navItems = [
    { path: '/student', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/student/projects', label: 'My Projects', icon: FolderOpen },
    { path: '/student/portfolio', label: 'Portfolio', icon: UserCircle },
    { path: '/student/settings', label: 'Settings', icon: Settings },
];

export function StudentSidebar() {
    const location = useLocation();

    return (
        <aside className="hidden w-64 flex-col border-r-2 border-gray-900 dark:border-gray-600 bg-card-light dark:bg-card-dark md:flex transition-colors duration-200">
            <div className="flex items-center gap-3 px-8 py-8">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary border-2 border-gray-900 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <Award className="w-5 h-5" />
                </div>
                <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">ProTrackr.</h1>
            </div>

            <nav className="flex-1 space-y-2 px-4 py-4">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path || (item.path !== '/student' && location.pathname.startsWith(item.path));
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={clsx(
                                "relative flex items-center gap-4 rounded-xl py-3 pl-8 pr-4 transition-all border-2 border-transparent",
                                isActive
                                    ? "bg-primary text-white border-gray-900 dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px]"
                                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                            )}
                        >
                            <Icon className="w-6 h-6" />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
            <div className="p-4 border-t-2 border-gray-900 dark:border-gray-600">
                <Link
                    to="/login"
                    className="relative flex items-center gap-4 rounded-xl py-3 pl-8 pr-4 transition-all text-gray-600 dark:text-gray-400 hover:text-[#FE5C73] dark:hover:text-[#FE5C73] hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                    <LogOut className="w-6 h-6" />
                    <span className="font-medium">Logout</span>
                </Link>
            </div>
        </aside>
    );
}

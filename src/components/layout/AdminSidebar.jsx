import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, BarChart3, LogOut } from 'lucide-react';
import clsx from 'clsx';
import { useAuth } from '../../context/AuthContext';

const navItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/students', label: 'Students', icon: Users },
    { path: '/admin/reports', label: 'Reports', icon: BarChart3 },
];

export function AdminSidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout, user } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <aside className="hidden w-64 flex-col border-r-2 border-gray-900 dark:border-gray-600 bg-card-light dark:bg-card-dark md:flex transition-colors duration-200">
            <div className="flex items-center gap-3 px-8 py-8">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#9C27B0] border-2 border-gray-900 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <FileText className="w-5 h-5" />
                </div>
                <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">ProTrackr Admin</h1>
            </div>

            <nav className="flex-1 space-y-2 px-4 py-4">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
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

            {/* User info */}
            <div className="px-6 py-3 border-t border-border-light dark:border-border-dark">
                <div className="flex items-center gap-3">
                    <img
                        src={user?.avatar_url ? user.avatar_url : `https://api.dicebear.com/7.x/notionists/svg?seed=${user?.full_name || 'Admin'}&backgroundColor=b6e3f4`}
                        alt=""
                        className="w-8 h-8 rounded-full bg-gray-100"
                    />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-text-main-light dark:text-white truncate">{user?.full_name}</p>
                        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark truncate">Administrator</p>
                    </div>
                </div>
            </div>

            <div className="p-4 border-t-2 border-gray-900 dark:border-gray-600">
                <button
                    onClick={handleLogout}
                    className="w-full relative flex items-center gap-4 rounded-xl py-3 pl-8 pr-4 transition-all text-gray-600 dark:text-gray-400 hover:text-[#FE5C73] dark:hover:text-[#FE5C73] hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                    <LogOut className="w-6 h-6" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
}

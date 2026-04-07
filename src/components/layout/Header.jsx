import { Search, Settings, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function Header({ title }) {
    const { user } = useAuth();
    const navigate = useNavigate();

    const settingsPath = user?.role === 'admin' ? '/admin' : '/student/settings';

    return (
        <header className="flex h-24 items-center justify-between border-b-2 border-gray-900 dark:border-gray-600 bg-card-light dark:bg-card-dark px-8 transition-colors duration-200">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
            <div className="flex items-center gap-6">
                <div className="hidden items-center rounded-xl border-2 border-gray-900 dark:border-gray-600 bg-background-light dark:bg-background-dark px-5 py-2.5 md:flex shadow-sm">
                    <Search className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    <input
                        className="ml-3 border-none bg-transparent text-sm text-gray-900 placeholder-gray-500 dark:text-white dark:placeholder-gray-400 focus:ring-0 outline-none w-64"
                        placeholder="Search..."
                        type="text"
                    />
                </div>
                <button
                    onClick={() => navigate(settingsPath)}
                    className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-gray-900 dark:border-gray-600 bg-background-light dark:bg-background-dark text-gray-600 dark:text-gray-300 shadow-sm hover:translate-y-[-2px] transition-transform"
                >
                    <Settings className="w-5 h-5" />
                </button>
                <button className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-gray-900 dark:border-gray-600 bg-background-light dark:bg-background-dark text-primary shadow-sm hover:translate-y-[-2px] transition-transform">
                    <Bell className="w-5 h-5" />
                </button>
                <img
                    alt="Profile"
                    className="h-12 w-12 rounded-xl object-cover border-2 border-gray-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    src={user?.avatar_url ? user.avatar_url : `https://api.dicebear.com/7.x/notionists/svg?seed=${user?.full_name || 'Felix'}&backgroundColor=b6e3f4`}
                />
            </div>
        </header>
    );
}

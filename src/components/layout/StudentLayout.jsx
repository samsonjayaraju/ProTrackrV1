import { Outlet } from 'react-router-dom';
import { StudentSidebar } from './StudentSidebar';
import { Header } from './Header';
import { Menu } from 'lucide-react';

export function StudentLayout() {
    return (
        <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark transition-colors duration-200">
            <StudentSidebar />
            <div className="flex flex-1 flex-col overflow-hidden">
                <Header title="Student Portal" />
                <main className="flex-1 overflow-y-auto p-8">
                    <Outlet />
                </main>
            </div>
            <div className="fixed bottom-6 right-6 z-50 md:hidden">
                <button className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-blue-500/50">
                    <Menu className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
}

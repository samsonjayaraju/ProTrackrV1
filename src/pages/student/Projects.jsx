import { useState } from 'react';
import { Search, Filter, Folder, MoreVertical, Calendar } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useNavigate } from 'react-router-dom';

const mockProjects = [
    {
        id: '1',
        title: 'UX Case Study: FinTech App',
        description: 'A comprehensive UX research and redesign for a modern fintech appliction focusing on accessibility.',
        status: 'Completed',
        progress: 100,
        lastUpdated: '2 hours ago',
        category: 'Design'
    },
    {
        id: '2',
        title: 'React E-commerce Dashboard',
        description: 'Frontend dashboard with charts and data tables for managing an online store.',
        status: 'In Progress',
        progress: 65,
        lastUpdated: 'Yesterday',
        category: 'Development'
    },
    {
        id: '3',
        title: 'Brand Identity for Cafe',
        description: 'Logo, typography, and color palette design for a local indie cafe.',
        status: 'Draft',
        progress: 10,
        lastUpdated: '3 days ago',
        category: 'Branding'
    },
    {
        id: '4',
        title: 'Data Vis - Global Warming',
        description: 'Interactive D3.js visualization showing global temperature changes over 100 years.',
        status: 'In Progress',
        progress: 80,
        lastUpdated: '1 week ago',
        category: 'Development'
    }
];

export function Projects() {
    const navigate = useNavigate();
    const [filter, setFilter] = useState('All');

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-2xl font-bold text-text-main-light dark:text-white">My Projects</h2>
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                    <Input
                        icon={<Search className="w-5 h-5" />}
                        placeholder="Search projects..."
                        className="w-full md:w-64 bg-white dark:bg-card-dark"
                    />
                    <div className="flex items-center gap-2 bg-white dark:bg-card-dark px-4 py-2 rounded-2xl border border-border-light dark:border-border-dark h-12">
                        <Filter className="w-5 h-5 text-text-secondary-light dark:text-text-secondary-dark" />
                        <select
                            className="bg-transparent border-none text-sm text-text-main-light dark:text-white focus:ring-0 outline-none"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="All">All Categories</option>
                            <option value="Design">Design</option>
                            <option value="Development">Development</option>
                            <option value="Branding">Branding</option>
                        </select>
                    </div>
                    <Button>New Project</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {mockProjects.filter(p => filter === 'All' || p.category === filter).map(project => (
                    <Card key={project.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/student/projects/${project.id}`)}>
                        <CardContent className="flex flex-col h-full gap-4 p-6">
                            <div className="flex justify-between items-start">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-primary">
                                    <Folder className="w-6 h-6" />
                                </div>
                                <button className="text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-full transition-colors" onClick={(e) => e.stopPropagation()}>
                                    <MoreVertical className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="mt-2">
                                <h3 className="text-lg font-bold text-text-main-light dark:text-white mb-1">{project.title}</h3>
                                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark line-clamp-2">{project.description}</p>
                            </div>

                            <div className="mt-auto pt-4 space-y-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-text-main-light dark:text-white font-medium">{project.progress}% completed</span>
                                    <Badge
                                        variant={
                                            project.status === 'Completed' ? 'success' :
                                                project.status === 'In Progress' ? 'warning' : 'default'
                                        }
                                    >
                                        {project.status}
                                    </Badge>
                                </div>
                                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5">
                                    <div
                                        className={`h-1.5 rounded-full ${project.status === 'Completed' ? 'bg-green-500' : 'bg-primary'}`}
                                        style={{ width: `${project.progress}%` }}
                                    ></div>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-text-secondary-light dark:text-text-secondary-dark pt-2 border-t border-border-light dark:border-border-dark">
                                    <Calendar className="w-4 h-4" />
                                    <span>Last updated: {project.lastUpdated}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

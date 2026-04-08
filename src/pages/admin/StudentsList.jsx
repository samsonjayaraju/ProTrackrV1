import { useState, useEffect } from 'react';
import { Search, Filter, Mail, Link as LinkIcon, ExternalLink } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { userService } from '../../services/api';
import { useNavigate } from 'react-router-dom';

export function StudentsList() {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        userService.getAll()
            .then(res => setStudents(res.data.students))
            .catch(err => console.error('Failed to load students:', err))
            .finally(() => setLoading(false));
    }, []);

    const filtered = students.filter(s =>
        s.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (s.roll_number || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleExportCsv = () => {
        const headers = ['Full Name', 'Email', 'Department', 'Year', 'Roll Number', 'Projects'];
        const rows = filtered.map(s => [
            s.full_name || '',
            s.email || '',
            s.department || '',
            s.year || '',
            s.roll_number || '',
            s.project_count ?? 0,
        ]);

        const escapeCell = (value) => {
            const text = String(value ?? '');
            if (text.includes('"') || text.includes(',') || text.includes('\n')) {
                return `"${text.replace(/"/g, '""')}"`;
            }
            return text;
        };

        const csvContent = [headers, ...rows]
            .map(row => row.map(escapeCell).join(','))
            .join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `students_export_${new Date().toISOString().slice(0, 10)}.csv`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-2xl font-bold text-text-main-light dark:text-white">Students Directory</h2>
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                    <Input
                        icon={<Search className="w-5 h-5" />}
                        placeholder="Search by name, roll no..."
                        className="w-full md:w-64 bg-white dark:bg-card-dark"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="flex items-center gap-2 bg-white dark:bg-card-dark px-4 py-2 rounded-2xl border border-border-light dark:border-border-dark h-12">
                        <Filter className="w-5 h-5 text-text-secondary-light dark:text-text-secondary-dark" />
                        <select className="bg-transparent border-none text-sm text-text-main-light dark:text-white focus:ring-0 outline-none">
                            <option value="All">All Departments</option>
                            <option value="CS">Computer Science</option>
                            <option value="DS">Data Science</option>
                            <option value="SE">Software Eng</option>
                        </select>
                    </div>
                    <Button onClick={handleExportCsv}>Export CSV</Button>
                </div>
            </div>

            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-text-main-light dark:text-white">
                        <thead className="bg-gray-50 dark:bg-gray-800/50 text-text-secondary-light dark:text-text-secondary-dark font-medium border-b border-border-light dark:border-border-dark">
                            <tr>
                                <th className="px-6 py-4 rounded-tl-3xl">Student Info</th>
                                <th className="px-6 py-4">Department & Year</th>
                                <th className="px-6 py-4 text-center">Projects</th>
                                <th className="px-6 py-4 text-right rounded-tr-3xl">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-light dark:divide-border-dark">
                            {filtered.length === 0 && (
                                <tr><td colSpan={4} className="px-6 py-8 text-center text-text-secondary-light">No students found.</td></tr>
                            )}
                            {filtered.map((student) => (
                                <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={student.avatar_url ? student.avatar_url : `https://api.dicebear.com/7.x/notionists/svg?seed=${student.full_name}`}
                                                alt={student.full_name}
                                                className="w-10 h-10 rounded-full bg-gray-100"
                                            />
                                            <div>
                                                <div className="font-bold">{student.full_name}</div>
                                                <div className="text-xs text-text-secondary-light dark:text-text-secondary-dark">{student.roll_number || 'N/A'}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div>{student.department || 'N/A'}</div>
                                        <div className="text-xs text-text-secondary-light dark:text-text-secondary-dark">{student.year || 'N/A'}</div>
                                    </td>
                                    <td className="px-6 py-4 text-center font-bold">
                                        {student.project_count}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Mail className="w-4 h-4 text-text-secondary-light" /></Button>
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><LinkIcon className="w-4 h-4 text-text-secondary-light" /></Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="gap-2"
                                                onClick={() => navigate(`/admin/students/${student.id}/portfolio`)}
                                            >
                                                <ExternalLink className="w-4 h-4" /> Portfolio
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 border-t border-border-light dark:border-border-dark flex justify-between items-center text-sm text-text-secondary-light dark:text-text-secondary-dark">
                    <div>Showing {filtered.length} of {students.length} students</div>
                </div>
            </Card>
        </div>
    );
}

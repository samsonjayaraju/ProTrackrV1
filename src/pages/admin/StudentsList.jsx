import { useState } from 'react';
import { Search, Filter, Mail, Link as LinkIcon, ExternalLink } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';

const mockStudents = [
    { id: 1, name: 'Alex Johnson', roll: 'CS2026-001', dept: 'Computer Science', year: 'Senior', projects: 12, topSkill: 'React' },
    { id: 2, name: 'Samson Jayaraju', roll: 'CS2026-042', dept: 'Computer Science', year: 'Senior', projects: 8, topSkill: 'UI/UX' },
    { id: 3, name: 'Maria Garcia', roll: 'DS2026-015', dept: 'Data Science', year: 'Junior', projects: 5, topSkill: 'Python' },
    { id: 4, name: 'James Smith', roll: 'SE2026-088', dept: 'Software Eng', year: 'Sophomore', projects: 3, topSkill: 'Swift' },
    { id: 5, name: 'Linda Chen', roll: 'CS2026-102', dept: 'Computer Science', year: 'Senior', projects: 15, topSkill: 'Node.js' },
    { id: 6, name: 'Robert Fox', roll: 'IT2026-033', dept: 'Information Tech', year: 'Junior', projects: 6, topSkill: 'Cybersecurity' },
];

export function StudentsList() {
    const [searchTerm, setSearchTerm] = useState('');

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
                    <Button>Export CSV</Button>
                </div>
            </div>

            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-text-main-light dark:text-white">
                        <thead className="bg-gray-50 dark:bg-gray-800/50 text-text-secondary-light dark:text-text-secondary-dark font-medium border-b border-border-light dark:border-border-dark">
                            <tr>
                                <th className="px-6 py-4 rounded-tl-3xl">Student Info</th>
                                <th className="px-6 py-4">Department & Year</th>
                                <th className="px-6 py-4">Top Skill</th>
                                <th className="px-6 py-4 text-center">Projects</th>
                                <th className="px-6 py-4 text-right rounded-tr-3xl">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-light dark:divide-border-dark">
                            {mockStudents.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.roll.toLowerCase().includes(searchTerm.toLowerCase())).map((student) => (
                                <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${student.name}`} alt={student.name} className="w-10 h-10 rounded-full bg-gray-100" />
                                            <div>
                                                <div className="font-bold">{student.name}</div>
                                                <div className="text-xs text-text-secondary-light dark:text-text-secondary-dark">{student.roll}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div>{student.dept}</div>
                                        <div className="text-xs text-text-secondary-light dark:text-text-secondary-dark">{student.year}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge variant="info">{student.topSkill}</Badge>
                                    </td>
                                    <td className="px-6 py-4 text-center font-bold">
                                        {student.projects}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Mail className="w-4 h-4 text-text-secondary-light" /></Button>
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><LinkIcon className="w-4 h-4 text-text-secondary-light" /></Button>
                                            <Button variant="outline" size="sm" className="gap-2"><ExternalLink className="w-4 h-4" /> Portfolio</Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 border-t border-border-light dark:border-border-dark flex justify-between items-center text-sm text-text-secondary-light dark:text-text-secondary-dark">
                    <div>Showing 1 to 6 of 248 entries</div>
                    <div className="flex gap-1">
                        <button className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-800 disabled:opacity-50" disabled>Prev</button>
                        <button className="px-3 py-1 rounded bg-primary text-white">1</button>
                        <button className="px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">2</button>
                        <button className="px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">3</button>
                        <button className="px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">Next</button>
                    </div>
                </div>
            </Card>
        </div>
    );
}

import { useState } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Camera, Save, Bell, Shield, Lock } from 'lucide-react';

export function Settings() {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-text-main-light dark:text-white mb-6">Settings</h2>

            {/* Tabs */}
            <div className="flex space-x-1 bg-card-light dark:bg-card-dark p-1 rounded-2xl shadow-sm border border-border-light dark:border-border-dark overflow-x-auto">
                <button
                    onClick={() => setActiveTab('profile')}
                    className={`flex-1 px-4 py-3 text-sm font-medium rounded-xl whitespace-nowrap transition-colors ${activeTab === 'profile' ? 'bg-primary text-white shadow-sm' : 'text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                >
                    Profile Information
                </button>
                <button
                    onClick={() => setActiveTab('security')}
                    className={`flex-1 px-4 py-3 text-sm font-medium rounded-xl whitespace-nowrap transition-colors ${activeTab === 'security' ? 'bg-primary text-white shadow-sm' : 'text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                >
                    Password & Security
                </button>
                <button
                    onClick={() => setActiveTab('notifications')}
                    className={`flex-1 px-4 py-3 text-sm font-medium rounded-xl whitespace-nowrap transition-colors ${activeTab === 'notifications' ? 'bg-primary text-white shadow-sm' : 'text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                >
                    Notifications
                </button>
            </div>

            <div className="mt-8">
                {activeTab === 'profile' && (
                    <Card>
                        <CardContent className="space-y-8">
                            <div className="flex flex-col md:flex-row gap-8 items-start">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="relative">
                                        <img
                                            src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=b6e3f4"
                                            alt="Profile"
                                            className="w-32 h-32 rounded-3xl border-2 border-gray-900 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                        />
                                        <button className="absolute bottom-2 right-2 p-2 bg-primary border-2 border-gray-900 text-white rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-none transition-all">
                                            <Camera className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <span className="text-xs text-text-secondary-light text-center">Allowed JPG, GIF or PNG.<br />Max size of 2MB</span>
                                </div>

                                <div className="flex-1 w-full space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-medium text-text-main-light dark:text-white mb-2">First Name</label>
                                            <Input defaultValue="Samson" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-text-main-light dark:text-white mb-2">Last Name</label>
                                            <Input defaultValue="Jayaraju" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-text-main-light dark:text-white mb-2">Email</label>
                                            <Input defaultValue="samson@university.edu" type="email" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-text-main-light dark:text-white mb-2">Major/Course</label>
                                            <Input defaultValue="Computer Science" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-text-main-light dark:text-white mb-2">Bio / About Me</label>
                                        <textarea
                                            className="w-full h-32 rounded-2xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark p-4 text-sm focus:ring-2 focus:ring-primary focus:border-transparent resize-none dark:text-white"
                                            defaultValue="Passionate Computer Science student with a focus on creating intuitive, accessible, and beautiful web interfaces."
                                        ></textarea>
                                    </div>

                                    <div className="pt-4 flex justify-end">
                                        <Button className="gap-2"><Save className="w-4 h-4" /> Save Changes</Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {activeTab === 'security' && (
                    <Card>
                        <CardContent className="space-y-6 max-w-2xl">
                            <div>
                                <h3 className="text-lg font-bold text-text-main-light dark:text-white mb-4 flex items-center gap-2"><Lock className="w-5 h-5" /> Change Password</h3>
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-medium text-text-main-light dark:text-white mb-2">Current Password</label>
                                        <Input type="password" placeholder="••••••••" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-text-main-light dark:text-white mb-2">New Password</label>
                                        <Input type="password" placeholder="••••••••" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-text-main-light dark:text-white mb-2">Confirm New Password</label>
                                        <Input type="password" placeholder="••••••••" />
                                    </div>
                                    <div className="pt-2">
                                        <Button>Update Password</Button>
                                    </div>
                                </div>
                            </div>

                            <hr className="border-border-light dark:border-border-dark" />

                            <div>
                                <h3 className="text-lg font-bold text-text-main-light dark:text-white mb-4 flex items-center gap-2"><Shield className="w-5 h-5" /> Portfolio Visibility</h3>
                                <div className="flex items-center justify-between p-4 border border-border-light dark:border-border-dark rounded-2xl">
                                    <div>
                                        <h4 className="font-semibold text-text-main-light dark:text-white">Public Profile</h4>
                                        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Allow recruiters/anyone to view your portfolio via link.</p>
                                    </div>
                                    {/* Simple toggle switch mockup */}
                                    <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                                        <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {activeTab === 'notifications' && (
                    <Card>
                        <CardContent className="space-y-6 max-w-2xl">
                            <h3 className="text-lg font-bold text-text-main-light dark:text-white mb-4 flex items-center gap-2"><Bell className="w-5 h-5" /> Email Notifications</h3>

                            <div className="space-y-4">
                                {[
                                    { title: 'Project Updates', desc: 'When teachers leave feedback on your projects.' },
                                    { title: 'Milestone Reminders', desc: 'Alerts for upcoming incomplete milestones.' },
                                    { title: 'Platform Announcements', desc: 'New features and updates to ProTrackr.' }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-card-dark border border-border-light dark:border-border-dark rounded-2xl">
                                        <div>
                                            <h4 className="font-semibold text-text-main-light dark:text-white text-sm">{item.title}</h4>
                                            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1">{item.desc}</p>
                                        </div>
                                        <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary" />
                                    </div>
                                ))}
                            </div>

                            <div className="pt-4">
                                <Button>Save Preferences</Button>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}

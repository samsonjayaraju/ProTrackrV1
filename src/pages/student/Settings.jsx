import { useState, useRef } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Camera, Save, Bell, Shield, Lock, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { uploadService, userService } from '../../services/api';

export function Settings() {
    const { user, updateUser } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [uploadingAvatar, setUploadingAvatar] = useState(false);
    const avatarInputRef = useRef(null);

    const [profile, setProfile] = useState({
        full_name: user?.full_name || '',
        email: user?.email || '',
        department: user?.department || '',
        year: user?.year || '',
        bio: user?.bio || '',
        location: user?.location || '',
        github_url: user?.github_url || '',
    });

    const [passwords, setPasswords] = useState({
        current_password: '',
        new_password: '',
        confirm_password: '',
    });
    const [pwErrors, setPwErrors] = useState({});

    const handleAvatarChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingAvatar(true);
        setMessage({ type: '', text: '' });

        try {
            const res = await uploadService.uploadAvatar(file);
            const updated = { ...user, avatar_url: res.data.avatar_url };
            updateUser(updated);
            setMessage({ type: 'success', text: 'Profile photo updated successfully!' });
        } catch (err) {
            setMessage({ type: 'error', text: err.response?.data?.error || 'Failed to upload avatar.' });
        } finally {
            setUploadingAvatar(false);
            if (avatarInputRef.current) avatarInputRef.current.value = '';
        }
    };

    const handleProfileSave = async () => {
        setSaving(true);
        setMessage({ type: '', text: '' });
        try {
            const res = await userService.updateProfile(profile);
            updateUser(res.data.user);
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
        } catch (err) {
            setMessage({ type: 'error', text: err.response?.data?.error || 'Failed to update profile.' });
        } finally {
            setSaving(false);
        }
    };

    const handlePasswordChange = async () => {
        const errs = {};
        if (!passwords.current_password) errs.current_password = 'Current password is required';
        if (!passwords.new_password) errs.new_password = 'New password is required';
        else if (passwords.new_password.length < 6) errs.new_password = 'Must be at least 6 characters';
        if (passwords.new_password !== passwords.confirm_password) errs.confirm_password = 'Passwords do not match';
        if (Object.keys(errs).length > 0) { setPwErrors(errs); return; }

        setSaving(true);
        setMessage({ type: '', text: '' });
        setPwErrors({});
        try {
            await userService.updatePassword({
                current_password: passwords.current_password,
                new_password: passwords.new_password,
            });
            setMessage({ type: 'success', text: 'Password updated successfully!' });
            setPasswords({ current_password: '', new_password: '', confirm_password: '' });
        } catch (err) {
            setMessage({ type: 'error', text: err.response?.data?.error || 'Failed to update password.' });
        } finally {
            setSaving(false);
        }
    };

    const nameParts = profile.full_name.split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';
    const avatarSrc = user?.avatar_url
        ? user.avatar_url
        : `https://api.dicebear.com/7.x/notionists/svg?seed=${user?.full_name || 'Felix'}&backgroundColor=b6e3f4`;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-text-main-light dark:text-white mb-6">Settings</h2>

            {message.text && (
                <div className={`p-4 rounded-2xl flex items-center gap-3 ${message.type === 'success' ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'}`}>
                    {message.type === 'success' ? <CheckCircle className="w-5 h-5 text-green-500" /> : <AlertCircle className="w-5 h-5 text-red-500" />}
                    <p className={`text-sm ${message.type === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{message.text}</p>
                </div>
            )}

            {/* Tabs */}
            <div className="flex space-x-1 bg-card-light dark:bg-card-dark p-1 rounded-2xl shadow-sm border border-border-light dark:border-border-dark overflow-x-auto">
                <button onClick={() => { setActiveTab('profile'); setMessage({ type: '', text: '' }); }} className={`flex-1 px-4 py-3 text-sm font-medium rounded-xl whitespace-nowrap transition-colors ${activeTab === 'profile' ? 'bg-primary text-white shadow-sm' : 'text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                    Profile Information
                </button>
                <button onClick={() => { setActiveTab('security'); setMessage({ type: '', text: '' }); }} className={`flex-1 px-4 py-3 text-sm font-medium rounded-xl whitespace-nowrap transition-colors ${activeTab === 'security' ? 'bg-primary text-white shadow-sm' : 'text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                    Password & Security
                </button>
                <button onClick={() => { setActiveTab('notifications'); setMessage({ type: '', text: '' }); }} className={`flex-1 px-4 py-3 text-sm font-medium rounded-xl whitespace-nowrap transition-colors ${activeTab === 'notifications' ? 'bg-primary text-white shadow-sm' : 'text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
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
                                            src={avatarSrc}
                                            alt="Profile"
                                            className="w-32 h-32 rounded-3xl border-2 border-gray-900 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                        />
                                        <input
                                            ref={avatarInputRef}
                                            type="file"
                                            accept="image/*"
                                            onChange={handleAvatarChange}
                                            className="hidden"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => avatarInputRef.current?.click()}
                                            disabled={uploadingAvatar}
                                            className="absolute bottom-2 right-2 p-2 bg-primary border-2 border-gray-900 text-white rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-none transition-all disabled:opacity-60"
                                        >
                                            {uploadingAvatar ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
                                        </button>
                                    </div>
                                    <span className="text-xs text-text-secondary-light text-center">Allowed JPG, GIF or PNG.<br />Max size of 5MB</span>
                                </div>

                                <div className="flex-1 w-full space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-medium text-text-main-light dark:text-white mb-2">First Name</label>
                                            <Input value={firstName} onChange={(e) => setProfile(p => ({ ...p, full_name: e.target.value + (lastName ? ' ' + lastName : '') }))} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-text-main-light dark:text-white mb-2">Last Name</label>
                                            <Input value={lastName} onChange={(e) => setProfile(p => ({ ...p, full_name: firstName + ' ' + e.target.value }))} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-text-main-light dark:text-white mb-2">Email</label>
                                            <Input value={profile.email} type="email" disabled className="opacity-60" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-text-main-light dark:text-white mb-2">Major/Course</label>
                                            <Input value={profile.department} onChange={(e) => setProfile(p => ({ ...p, department: e.target.value }))} />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-text-main-light dark:text-white mb-2">Bio / About Me</label>
                                        <textarea
                                            className="w-full h-32 rounded-2xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark p-4 text-sm focus:ring-2 focus:ring-primary focus:border-transparent resize-none dark:text-white"
                                            value={profile.bio}
                                            onChange={(e) => setProfile(p => ({ ...p, bio: e.target.value }))}
                                        ></textarea>
                                    </div>

                                    <div className="pt-4 flex justify-end">
                                        <Button className="gap-2" onClick={handleProfileSave} disabled={saving}>
                                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                            Save Changes
                                        </Button>
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
                                        <Input type="password" placeholder="••••••••" value={passwords.current_password} onChange={(e) => { setPasswords(p => ({ ...p, current_password: e.target.value })); setPwErrors({}); }} />
                                        {pwErrors.current_password && <p className="text-xs text-red-500 mt-1">{pwErrors.current_password}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-text-main-light dark:text-white mb-2">New Password</label>
                                        <Input type="password" placeholder="••••••••" value={passwords.new_password} onChange={(e) => { setPasswords(p => ({ ...p, new_password: e.target.value })); setPwErrors({}); }} />
                                        {pwErrors.new_password && <p className="text-xs text-red-500 mt-1">{pwErrors.new_password}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-text-main-light dark:text-white mb-2">Confirm New Password</label>
                                        <Input type="password" placeholder="••••••••" value={passwords.confirm_password} onChange={(e) => { setPasswords(p => ({ ...p, confirm_password: e.target.value })); setPwErrors({}); }} />
                                        {pwErrors.confirm_password && <p className="text-xs text-red-500 mt-1">{pwErrors.confirm_password}</p>}
                                    </div>
                                    <div className="pt-2">
                                        <Button onClick={handlePasswordChange} disabled={saving}>
                                            {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                            Update Password
                                        </Button>
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

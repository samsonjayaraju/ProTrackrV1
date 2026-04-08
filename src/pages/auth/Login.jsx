import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Mail, Lock, User, School, AlertCircle, Loader2, Shield } from 'lucide-react';

export function Login() {
    const navigate = useNavigate();
    const { login, register } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [loginRole, setLoginRole] = useState('student');
    const [signupRole, setSignupRole] = useState('student');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState('');

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (!isLogin && formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        if (!isLogin && !formData.full_name.trim()) {
            newErrors.full_name = 'Full name is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (field) => (e) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
        if (apiError) setApiError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        setApiError('');

        try {
            if (isLogin) {
                const user = await login(formData.email, formData.password);
                navigate(user.role === 'admin' ? '/admin' : '/student');
            } else {
                await register({
                    full_name: formData.full_name,
                    email: formData.email,
                    password: formData.password,
                    role: signupRole === 'faculty' ? 'admin' : 'student',
                });
                navigate(signupRole === 'faculty' ? '/admin' : '/student');
            }
        } catch (err) {
            const msg = err.response?.data?.error || err.response?.data?.errors?.[0]?.msg || 'Something went wrong. Please try again.';
            setApiError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark p-4 transition-colors duration-200">
            <div className="w-full max-w-5xl flex rounded-3xl overflow-hidden shadow-xl bg-card-light dark:bg-card-dark">
                {/* Left Side - Image/Branding */}
                <div className="hidden lg:flex w-1/2 bg-primary p-12 flex-col justify-between relative overflow-hidden">
                    <div className="z-10 relative">
                        <h1 className="text-4xl font-extrabold text-white mb-4">ProTrackr.</h1>
                        <p className="text-gray-200 text-lg">
                            The ultimate platform for tracking and managing student projects and portfolios.
                        </p>
                    </div>
                    <div className="z-10 relative">
                        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 text-white border border-white/30">
                            <p className="font-medium italic">"ProTrackr helped me organize my college projects and showcase my portfolio perfectly to recruiters."</p>
                            <p className="mt-4 font-bold">- Alex Johnson, CS Major</p>
                        </div>
                    </div>
                    {/* Decorative shapes */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-accent/30 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#9C27B0]/30 blur-3xl"></div>
                </div>

                {/* Right Side - Form */}
                <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                    <div className="w-full max-w-md mx-auto">
                        <h2 className="text-3xl font-bold text-text-main-light dark:text-white mb-2">
                            {isLogin ? 'Welcome Back!' : 'Create an Account'}
                        </h2>
                        <p className="text-text-secondary-light dark:text-text-secondary-dark mb-8">
                            {isLogin ? 'Please enter your details to sign in.' : 'Enter your details to register as a student.'}
                        </p>

                        {apiError && (
                            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                <p className="text-sm text-red-600 dark:text-red-400">{apiError}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {isLogin && (
                                <div>
                                    <label className="block text-sm font-medium text-text-main-light dark:text-white mb-2">Sign in as</label>
                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setLoginRole('student')}
                                            className={`flex-1 flex items-center justify-center gap-2 h-11 rounded-2xl border text-sm font-semibold transition-colors ${loginRole === 'student'
                                                ? 'bg-primary text-white border-gray-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                                                : 'bg-white dark:bg-card-dark text-text-main-light dark:text-white border-border-light dark:border-border-dark'}`}
                                        >
                                            <School className="w-4 h-4" /> Student
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setLoginRole('faculty')}
                                            className={`flex-1 flex items-center justify-center gap-2 h-11 rounded-2xl border text-sm font-semibold transition-colors ${loginRole === 'faculty'
                                                ? 'bg-primary text-white border-gray-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                                                : 'bg-white dark:bg-card-dark text-text-main-light dark:text-white border-border-light dark:border-border-dark'}`}
                                        >
                                            <Shield className="w-4 h-4" /> Faculty
                                        </button>
                                    </div>
                                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-2">
                                        {loginRole === 'faculty' ? 'Faculty accounts access admin dashboards.' : 'Student accounts access their project workspace.'}
                                    </p>
                                </div>
                            )}
                            {!isLogin && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-text-main-light dark:text-white mb-2">Sign up as</label>
                                        <div className="flex gap-3">
                                            <button
                                                type="button"
                                                onClick={() => setSignupRole('student')}
                                                className={`flex-1 flex items-center justify-center gap-2 h-11 rounded-2xl border text-sm font-semibold transition-colors ${signupRole === 'student'
                                                    ? 'bg-primary text-white border-gray-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                                                    : 'bg-white dark:bg-card-dark text-text-main-light dark:text-white border-border-light dark:border-border-dark'}`}
                                            >
                                                <School className="w-4 h-4" /> Student
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setSignupRole('faculty')}
                                                className={`flex-1 flex items-center justify-center gap-2 h-11 rounded-2xl border text-sm font-semibold transition-colors ${signupRole === 'faculty'
                                                    ? 'bg-primary text-white border-gray-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                                                    : 'bg-white dark:bg-card-dark text-text-main-light dark:text-white border-border-light dark:border-border-dark'}`}
                                            >
                                                <Shield className="w-4 h-4" /> Faculty
                                            </button>
                                        </div>
                                        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-2">
                                            {signupRole === 'faculty' ? 'Faculty accounts access admin dashboards.' : 'Student accounts access their project workspace.'}
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-text-main-light dark:text-white mb-2">Full Name</label>
                                        <Input
                                            icon={<User className="w-5 h-5" />}
                                            placeholder="John Doe"
                                            value={formData.full_name}
                                            onChange={handleChange('full_name')}
                                        />
                                        {errors.full_name && <p className="text-xs text-red-500 mt-1 ml-1">{errors.full_name}</p>}
                                    </div>
                                </>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-text-main-light dark:text-white mb-2">Email</label>
                                <Input
                                    type="email"
                                    icon={isLogin ? <Mail className="w-5 h-5" /> : (signupRole === 'faculty' ? <Shield className="w-5 h-5" /> : <School className="w-5 h-5" />)}
                                    placeholder={isLogin ? 'Enter your email' : (signupRole === 'faculty' ? 'faculty@university.edu' : 'student@university.edu')}
                                    value={formData.email}
                                    onChange={handleChange('email')}
                                />
                                {errors.email && <p className="text-xs text-red-500 mt-1 ml-1">{errors.email}</p>}
                                {!isLogin && <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1 ml-1">Use any email to register.</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-text-main-light dark:text-white mb-2">Password</label>
                                <Input
                                    type="password"
                                    icon={<Lock className="w-5 h-5" />}
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange('password')}
                                />
                                {errors.password && <p className="text-xs text-red-500 mt-1 ml-1">{errors.password}</p>}
                            </div>

                            {isLogin && (
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input id="remember" type="checkbox" className="w-4 h-4 rounded border-gray-900 text-primary focus:ring-primary shadow-sm" />
                                        <label htmlFor="remember" className="ml-2 text-sm text-gray-600 dark:text-gray-400 font-medium">Remember me</label>
                                    </div>
                                    <a href="#" className="text-sm font-bold text-gray-900 dark:text-gray-100 hover:text-primary transition-colors">Forgot password?</a>
                                </div>
                            )}

                            <Button type="submit" className="w-full mt-2" size="lg" disabled={loading}>
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        {isLogin ? 'Signing In...' : 'Creating Account...'}
                                    </span>
                                ) : (
                                    isLogin ? 'Sign In' : 'Sign Up'
                                )}
                            </Button>

                            {isLogin && (
                                <div className="text-center">
                                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                                        Use your registered account to sign in.
                                    </p>
                                </div>
                            )}
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                                {isLogin ? "Don't have an account? " : "Already have an account? "}
                                <button
                                    onClick={() => { setIsLogin(!isLogin); setErrors({}); setApiError(''); }}
                                    className="font-bold text-gray-900 dark:text-white hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary"
                                >
                                    {isLogin ? 'Sign up' : 'Log in'}
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

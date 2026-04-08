import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Mail, Lock, User, School } from 'lucide-react';

export function Login() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Dummy authentication logic
        if (email.toLowerCase().includes('admin')) {
            navigate('/admin');
        } else {
            navigate('/student');
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

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {!isLogin && (
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-medium text-text-main-light dark:text-white mb-2">Full Name</label>
                                        <Input icon={<User className="w-5 h-5" />} placeholder="John Doe" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-text-main-light dark:text-white mb-2">College Email</label>
                                        <Input type="email" icon={<School className="w-5 h-5" />} placeholder="student@university.edu" required />
                                        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1 ml-1">Must be an institutional email address.</p>
                                    </div>
                                </div>
                            )}

                            {isLogin && (
                                <div>
                                    <label className="block text-sm font-medium text-text-main-light dark:text-white mb-2">Email</label>
                                    <Input
                                        type="email"
                                        icon={<Mail className="w-5 h-5" />}
                                        placeholder="Enter your email (use 'admin' for Teacher view)"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-text-main-light dark:text-white mb-2">Password</label>
                                <Input
                                    type="password"
                                    icon={<Lock className="w-5 h-5" />}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
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

                            <Button type="submit" className="w-full mt-2" size="lg">
                                {isLogin ? 'Sign In' : 'Sign Up'}
                            </Button>
                            <div className="w-full space-y-4">
                                <Button type="button" onClick={() => navigate('/admin')} variant="outline" className="w-full">
                                    Admin Login (Demo)
                                </Button>
                            </div>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                                {isLogin ? "Don't have an account? " : "Already have an account? "}
                                <button
                                    onClick={() => setIsLogin(!isLogin)}
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

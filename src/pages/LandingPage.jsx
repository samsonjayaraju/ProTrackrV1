import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    GraduationCap,
    Menu,
    Zap,
    ArrowRight,
    PlayCircle,
    CheckCircle2,
    Star,
    Users,
    School,
    FolderOpen,
    LayoutDashboard,
    Images,
    Code,
    Palette
} from 'lucide-react';

export function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300 min-h-screen relative overflow-hidden">
            {/* Background Blobs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute filter blur-[60px] opacity-60 bg-[#9C27B0]/20 dark:bg-[#9C27B0]/10 w-96 h-96 rounded-full top-[-10%] left-[-10%] animate-pulse"></div>
                <div className="absolute filter blur-[60px] opacity-60 bg-[#FFD700]/30 dark:bg-[#FFD700]/10 w-80 h-80 rounded-full bottom-[10%] right-[-5%] mix-blend-multiply dark:mix-blend-screen"></div>
                <div className="absolute filter blur-[60px] opacity-60 bg-[#FF6B35]/20 dark:bg-[#FF6B35]/10 w-64 h-64 rounded-full top-[40%] right-[10%]"></div>
            </div>

            {/* Navbar */}
            <nav className="sticky top-0 z-50 backdrop-blur-md border-b-2 border-gray-900/5 dark:border-white/5 bg-background-light/90 dark:bg-background-dark/90">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex-shrink-0 flex items-center gap-2">
                            <div className="w-10 h-10 bg-[#FF6B35] rounded-lg flex items-center justify-center border-2 border-gray-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                <GraduationCap className="text-white w-6 h-6" />
                            </div>
                            <span className="font-bold text-2xl tracking-tight">ProTrackr</span>
                        </div>
                        <div className="hidden md:flex items-center space-x-8">
                            <a className="text-gray-600 dark:text-gray-300 hover:text-[#FF6B35] font-medium transition-colors" href="#">Features</a>
                            <div className="flex items-center space-x-4">
                                <button onClick={() => navigate('/login')} className="font-bold text-gray-900 dark:text-white hover:text-[#FF6B35] transition-colors">Log In</button>
                                <button onClick={() => navigate('/login')} className="px-6 py-2.5 bg-[#FF6B35] text-white font-bold rounded-xl border-2 border-gray-900 dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-y-1 active:shadow-none">
                                    Get Started
                                </button>
                            </div>
                        </div>
                        <div className="md:hidden flex items-center">
                            <button className="text-gray-900 dark:text-white hover:text-[#FF6B35]">
                                <Menu className="w-8 h-8" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative pt-16 pb-20 lg:pt-32 lg:pb-28 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                        <div className="text-center lg:text-left space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFD700]/20 border border-[#FFD700]/50 text-yellow-700 dark:text-yellow-400 font-semibold text-sm uppercase tracking-wider mb-2">
                                <Zap className="w-4 h-4" />
                                v2.0 is Live Now
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight text-gray-900 dark:text-white">
                                Showcase your <br />
                                <span className="relative inline-block text-[#FF6B35]">
                                    journey
                                    <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#FFD700] z-[-1]" fill="none" viewBox="0 0 200 9" xmlns="http://www.w3.org/2000/svg"><path d="M2.00025 6.99997C2.00025 6.99997 28.0008 2.00026 58.5008 2.00026C89.0009 2.00026 211.5 8.50005 211.5 8.50005" stroke="currentColor" strokeLinecap="round" strokeWidth="3"></path></svg>
                                </span>
                                {' '}with ProTrackr
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                                Build your portfolio, manage projects, and showcase your academic milestones to the world. A vibrant space for your achievements.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                                <button onClick={() => navigate('/login')} className="w-full sm:w-auto px-8 py-4 bg-[#FF6B35] text-white text-lg font-bold rounded-xl border-2 border-gray-900 dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-2">
                                    Start Building
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                                <button className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-lg font-bold rounded-xl border-2 border-gray-900 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center justify-center gap-2">
                                    <PlayCircle className="w-5 h-5 text-[#9C27B0]" />
                                    Watch Demo
                                </button>
                            </div>
                            <div className="pt-8 flex items-center justify-center lg:justify-start gap-6 text-sm font-medium text-gray-500 dark:text-gray-400">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-green-500" /> Always Free for Students
                                </div>

                            </div>
                        </div>

                        {/* Abstract Illustration Block */}
                        <div className="relative lg:h-[600px] flex items-center justify-center">
                            <div className="absolute inset-0 opacity-50 dark:opacity-20 rounded-3xl transform rotate-3 scale-95 border-2 border-dashed border-gray-300 dark:border-gray-700" style={{ backgroundImage: 'radial-gradient(#E5E7EB 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                            <div className="relative z-10 w-full max-w-lg transform hover:-rotate-1 transition-transform duration-500">
                                <div className="bg-card-light dark:bg-card-dark rounded-2xl border-2 border-gray-900 dark:border-gray-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                                    <div className="bg-gray-100 dark:bg-gray-800 border-b-2 border-gray-900 dark:border-gray-600 p-4 flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-400 border border-gray-900"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-400 border border-gray-900"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-400 border border-gray-900"></div>
                                    </div>
                                    <div className="p-8 flex flex-col items-center">
                                        <img alt="Student Illustration" className="w-32 h-32 rounded-full border-4 border-[#FFD700] object-cover mb-4 shadow-md bg-blue-100" src="https://api.dicebear.com/7.x/notionists/svg?seed=Sarah&backgroundColor=b6e3f4" />
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Samson </h3>
                                        <p className="text-[#9C27B0] font-medium mb-6">Computer Science Student</p>
                                        <div className="w-full space-y-4">
                                            <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg text-blue-600 dark:text-blue-300">
                                                        <Code className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-sm">React Project</p>
                                                        <p className="text-xs text-gray-500">In Progress</p>
                                                    </div>
                                                </div>
                                                <span className="text-xs font-bold bg-white dark:bg-gray-800 px-2 py-1 rounded border border-gray-200 dark:border-gray-700">85%</span>
                                            </div>
                                            <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-purple-100 dark:bg-purple-800 rounded-lg text-purple-600 dark:text-purple-300">
                                                        <Palette className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-sm">UX Case Study</p>
                                                        <p className="text-xs text-gray-500">Completed</p>
                                                    </div>
                                                </div>
                                                <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded border border-green-200">Done</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute -bottom-6 -right-6 bg-[#FFD700] text-gray-900 p-4 rounded-xl border-2 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-6 animate-bounce" style={{ animationDuration: '3s' }}>
                                    <div className="flex items-center gap-2 font-bold">
                                        <Star className="w-5 h-5 fill-current" />
                                        <span>Top Student</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Stats Section */}
            <section className="py-16 bg-white dark:bg-gray-900 border-y-2 border-gray-900/5 dark:border-white/5 relative z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-card-light dark:bg-card-dark p-6 rounded-2xl border-2 border-gray-900 dark:border-gray-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-4px] transition-transform">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="p-3 bg-[#FF6B35]/20 rounded-lg text-[#FF6B35]">
                                    <Users className="w-8 h-8" />
                                </div>
                                <h3 className="text-4xl font-bold text-gray-900 dark:text-white">10+</h3>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 font-medium">Active Students using ProTrackr daily.</p>
                        </div>
                        <div className="bg-card-light dark:bg-card-dark p-6 rounded-2xl border-2 border-gray-900 dark:border-gray-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-4px] transition-transform">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="p-3 bg-[#9C27B0]/20 rounded-lg text-[#9C27B0]">
                                    <School className="w-8 h-8" />
                                </div>
                                <h3 className="text-4xl font-bold text-gray-900 dark:text-white">1+</h3>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 font-medium">Universities partnered worldwide.</p>
                        </div>
                        <div className="bg-card-light dark:bg-card-dark p-6 rounded-2xl border-2 border-gray-900 dark:border-gray-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-4px] transition-transform">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="p-3 bg-[#FFD700]/20 rounded-lg text-yellow-600 dark:text-yellow-400">
                                    <FolderOpen className="w-8 h-8" />
                                </div>
                                <h3 className="text-4xl font-bold text-gray-900 dark:text-white">10+</h3>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 font-medium">Projects showcased this year.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">See ProTrackr in <span className="text-[#9C27B0] w-full relative inline-block">Action<svg className="absolute w-full h-3 -bottom-1 left-0 text-[#FFD700] opacity-50 z-[-1]" fill="none" viewBox="0 0 200 9" xmlns="http://www.w3.org/2000/svg"><path d="M2.00025 6.99997C2.00025 6.99997 28.0008 2.00026 58.5008 2.00026C89.0009 2.00026 211.5 8.50005 211.5 8.50005" stroke="currentColor" strokeLinecap="round" strokeWidth="3"></path></svg></span></h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Designed for students who want to stand out. Simple, powerful, and fun to use.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="group flex flex-col">
                            <div className="relative mb-6">
                                <div className="relative bg-gray-50 dark:bg-gray-800 rounded-3xl overflow-hidden border-2 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all h-[280px] flex flex-col">
                                    <div className="bg-white dark:bg-gray-700 p-4 flex gap-2 border-b-2 border-gray-900">
                                        <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] border-2 border-gray-900"></div>
                                        <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] border-2 border-gray-900"></div>
                                        <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F] border-2 border-gray-900"></div>
                                    </div>
                                    <div className="p-5 flex flex-col gap-4 flex-1 bg-white">
                                        {/* Stats row */}
                                        <div className="flex gap-4">
                                            <div className="flex-1 border-2 border-gray-100 rounded-2xl p-4 flex flex-col justify-center">
                                                <div className="w-8 h-1.5 bg-[#FF6B35] rounded-full mb-3"></div>
                                                <div className="text-sm font-black text-gray-800">128</div>
                                                <div className="text-[8px] font-bold text-gray-400 mt-1">COMMITS</div>
                                            </div>
                                            <div className="flex-1 border-2 border-gray-100 rounded-2xl p-4 flex flex-col justify-center">
                                                <div className="w-8 h-1.5 bg-[#9C27B0] rounded-full mb-3"></div>
                                                <div className="text-sm font-black text-gray-800">92%</div>
                                                <div className="text-[8px] font-bold text-gray-400 mt-1">PROGRESS</div>
                                            </div>
                                        </div>
                                        {/* Chart row */}
                                        <div className="flex items-end justify-between h-20 border-b-2 border-gray-100 pb-0 gap-1 mt-1 px-2">
                                            <div className="w-[15%] h-8 bg-[#FFD700]/30 rounded-t-2xl"></div>
                                            <div className="w-[18%] h-12 bg-[#FF6B35]/40 rounded-t-2xl"></div>
                                            <div className="w-[20%] h-16 bg-[#FF6B35] rounded-t-2xl"></div>
                                            <div className="w-[18%] h-10 bg-[#FF6B35]/40 rounded-t-2xl"></div>
                                            <div className="w-[18%] h-14 bg-[#FF6B35] rounded-t-2xl"></div>
                                        </div>
                                        {/* Bottom row */}
                                        <div className="mt-auto h-12 bg-[#FFD700]/10 rounded-xl border-2 border-[#FFD700]/30 flex items-center px-4 gap-3">
                                            <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center">
                                                <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
                                            </div>
                                            <div className="h-2 w-24 bg-gray-300 rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center md:text-left mt-2">
                                <div className="inline-flex items-center justify-center p-3 bg-[#FF6B35] text-white rounded-full mb-4 border-[3px] border-gray-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] w-14 h-14">
                                    <LayoutDashboard className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Project Overview</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">Build your portfolio, manage projects, and track your progress with intuitive dashboards.</p>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="group flex flex-col">
                            <div className="relative mb-6">
                                <div className="relative bg-gray-50 dark:bg-gray-800 rounded-3xl overflow-hidden border-2 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all h-[280px] flex flex-col">
                                    <div className="bg-white dark:bg-gray-700 p-4 flex gap-2 border-b-2 border-gray-900">
                                        <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] border-2 border-gray-900"></div>
                                        <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] border-2 border-gray-900"></div>
                                        <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F] border-2 border-gray-900"></div>
                                    </div>
                                    <div className="p-6 flex flex-col items-center justify-center gap-8 flex-1 bg-gray-50/50">
                                        {/* Avatars */}
                                        <div className="flex -space-x-3 items-center">
                                            <div className="w-12 h-12 rounded-full bg-indigo-100 border-[3px] border-gray-900 shadow-sm flex items-center justify-center text-xs font-black z-10 text-gray-700">JD</div>
                                            <div className="w-12 h-12 rounded-full bg-blue-100 border-[3px] border-gray-900 shadow-sm flex items-center justify-center text-xs font-black z-20 text-gray-700">AN</div>
                                            <div className="w-12 h-12 rounded-full bg-purple-100 border-[3px] border-gray-900 shadow-sm flex items-center justify-center text-xs font-black z-30 text-gray-700">SK</div>
                                            <div className="w-12 h-12 rounded-full bg-[#FFD700] border-[3px] border-gray-900 shadow-sm flex items-center justify-center text-xs font-black z-40 text-gray-900">+5</div>
                                        </div>
                                        {/* Comment box */}
                                        <div className="w-full bg-white rounded-3xl border-2 border-gray-900 p-5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-4">
                                            <div className="flex gap-3 items-center">
                                                <div className="w-3 h-3 rounded-full bg-[#9C27B0]"></div>
                                                <div className="h-3 w-full bg-gray-100 rounded-full"></div>
                                            </div>
                                            <div className="h-3 w-4/5 bg-gray-100 rounded-full ml-6"></div>
                                            <div className="flex gap-3 mt-2">
                                                <div className="bg-gray-100 rounded-full px-4 py-2 flex items-center gap-1.5 cursor-pointer hover:bg-gray-200">
                                                    <span className="text-[10px] font-black text-gray-600">👍 LIKE</span>
                                                </div>
                                                <div className="bg-[#9C27B0] rounded-full px-4 py-2 flex items-center gap-1.5 cursor-pointer hover:bg-purple-700">
                                                    <span className="text-[10px] font-black text-white flex items-center gap-1">
                                                        <svg className="w-3 h-3 text-white fill-current" viewBox="0 0 24 24"><path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z" /></svg>
                                                        REPLY
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center md:text-left mt-2">
                                <div className="inline-flex items-center justify-center p-3 bg-[#9C27B0] text-white rounded-full mb-4 border-[3px] border-gray-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] w-14 h-14">
                                    <Users className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Peer Review</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">Receive feedback, manage peer reviews, and collaborate seamlessly.</p>
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="group flex flex-col">
                            <div className="relative mb-6">
                                <div className="relative bg-gray-50 dark:bg-gray-800 rounded-3xl overflow-hidden border-2 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all h-[280px] flex flex-col">
                                    <div className="bg-white dark:bg-gray-700 p-4 flex gap-2 border-b-2 border-gray-900">
                                        <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] border-2 border-gray-900"></div>
                                        <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] border-2 border-gray-900"></div>
                                        <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F] border-2 border-gray-900"></div>
                                    </div>
                                    <div className="p-3 grid grid-cols-2 grid-rows-2 gap-3 flex-1 bg-white">
                                        <div className="bg-[#607D51] rounded-2xl flex items-center justify-center relative overflow-hidden border-2 border-gray-900 shadow-sm">
                                            <span className="text-6xl text-white/50 font-light font-serif mix-blend-overlay">1</span>
                                            <div className="absolute bottom-3 right-3 bg-[#FFD700] text-gray-900 text-[10px] font-black px-3 py-1 rounded-full border-2 border-gray-900">VIEW</div>
                                        </div>
                                        <div className="bg-[#2D4A3D] rounded-2xl flex items-center justify-center relative p-4 border-2 border-gray-900 shadow-sm">
                                            <div className="border border-white/20 rounded-lg w-full h-full p-3 flex flex-col gap-2">
                                                <div className="h-1.5 w-full bg-white/40 mb-2 rounded-full"></div>
                                                <div className="h-1.5 w-3/4 bg-white/20 rounded-full"></div>
                                                <div className="h-1.5 w-1/2 bg-white/20 rounded-full"></div>
                                            </div>
                                            <div className="absolute bottom-3 right-3 bg-[#FFD700] text-gray-900 text-[10px] font-black px-3 py-1 rounded-full border-2 border-gray-900">VIEW</div>
                                        </div>
                                        <div className="bg-[#4D6451] rounded-2xl flex items-center justify-center relative overflow-hidden border-2 border-gray-900 shadow-sm">
                                            <span className="text-7xl text-black/20 font-light font-serif mb-2">0</span>
                                            <div className="absolute bottom-3 right-3 bg-[#FFD700] text-gray-900 text-[10px] font-black px-3 py-1 rounded-full border-2 border-gray-900">VIEW</div>
                                        </div>
                                        <div className="bg-[#1C3630] rounded-2xl flex items-end justify-start relative p-2 overflow-hidden border-2 border-gray-900 shadow-sm">
                                            <div className="w-16 h-16 bg-white/10 rounded-tr-[2rem] absolute bottom-0 left-0"></div>
                                            <div className="absolute bottom-3 right-3 flex gap-2 items-center">
                                                <div className="bg-white/20 text-white text-[10px] px-2 py-1 rounded font-mono font-bold">4</div>
                                                <div className="bg-[#FFD700] text-gray-900 text-[10px] font-black px-3 py-1 rounded-full border-2 border-gray-900">VIEW</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center md:text-left mt-2">
                                <div className="inline-flex items-center justify-center p-3 bg-[#FFD700] text-gray-900 rounded-full mb-4 border-[3px] border-gray-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] w-14 h-14">
                                    <Images className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Portfolio Showcase</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">Edit your portfolio, manage projects, and present your best work.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* University Logos */}
            <section className="py-12 bg-gray-50 dark:bg-gray-900 border-t-2 border-gray-900/5 dark:border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap justify-center items-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        <span className="font-serif text-2xl font-bold text-gray-800 dark:text-gray-300">MIT</span>
                        <span className="font-sans text-2xl font-bold tracking-tight text-gray-800 dark:text-gray-300">Stanford</span>
                        <span className="font-serif italic text-2xl text-gray-800 dark:text-gray-300">Berkeley</span>
                        <span className="font-bold text-2xl text-gray-800 dark:text-gray-300 uppercase tracking-widest">Yale</span>
                        <span className="font-mono text-xl font-bold text-gray-800 dark:text-gray-300">KL University</span>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#1A1A1A] text-white pt-16 pb-8 border-t-8 border-[#FF6B35]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
                        <div className="col-span-2 lg:col-span-2">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 bg-[#FF6B35] rounded flex items-center justify-center">
                                    <GraduationCap className="text-white w-5 h-5" />
                                </div>
                                <span className="font-bold text-xl">ProTrackr</span>
                            </div>
                            <p className="text-gray-400 text-sm max-w-xs mb-6">
                                Empowering students to track their journey and showcase their potential to the world.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-4">Company</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a className="hover:text-[#FF6B35] transition-colors" href="#">About</a></li>
                                <li><a className="hover:text-[#FF6B35] transition-colors" href="#">Careers</a></li>
                                <li><a className="hover:text-[#FF6B35] transition-colors" href="#">Blog</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-4">Resources</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a className="hover:text-[#FF6B35] transition-colors" href="#">Pricing</a></li>
                                <li><a className="hover:text-[#FF6B35] transition-colors" href="#">Documentation</a></li>
                                <li><a className="hover:text-[#FF6B35] transition-colors" href="#">Guides</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-4">Legal</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a className="hover:text-[#FF6B35] transition-colors" href="#">Privacy</a></li>
                                <li><a className="hover:text-[#FF6B35] transition-colors" href="#">Terms</a></li>
                                <li><a className="hover:text-[#FF6B35] transition-colors" href="#">Security</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                        <p>© 2026 ProTrackr Inc. All rights reserved.</p>
                        <div className="flex gap-4 mt-4 md:mt-0">
                            <span>Made with <span className="text-red-500">♥</span> for students</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

import { Briefcase, Mail, MapPin, Link as LinkIcon, Download, Share2, Award, Star } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export function Portfolio() {
    return (
        <div className="max-w-6xl mx-auto space-y-8">
            {/* Hero Section */}
            <div className="relative rounded-3xl border-2 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden bg-primary h-64 md:h-80">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent/90"></div>
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white/20 blur-3xl"></div>
                <div className="absolute bottom-0 left-1/4 w-60 h-60 rounded-full bg-white/10 blur-3xl"></div>
            </div>

            <div className="px-4 sm:px-8 -mt-24 relative z-10">
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-end">
                    <div className="relative">
                        <img
                            src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=b6e3f4"
                            alt="Student"
                            className="w-32 h-32 md:w-40 md:h-40 rounded-3xl border-4 border-background-light dark:border-background-dark bg-white"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-background-light dark:border-background-dark"></div>
                    </div>

                    <div className="flex-1 pb-2">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-text-main-light dark:text-white mb-2">Samson Jayaraju</h1>
                        <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark flex items-center gap-2">
                            <Briefcase className="w-5 h-5" /> UI/UX Designer & Frontend Developer
                        </p>
                    </div>

                    <div className="flex gap-3 pb-2 w-full md:w-auto">
                        <Button variant="outline" className="flex-1 md:flex-none gap-2"><Share2 className="w-4 h-4" /> Share</Button>
                        <Button className="flex-1 md:flex-none gap-2"><Download className="w-4 h-4" /> Resume</Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="space-y-8">
                    <Card>
                        <CardContent className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-text-main-light dark:text-white mb-3">About Me</h3>
                                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                                    Passionate Computer Science student with a focus on creating intuitive, accessible, and beautiful web interfaces. Bridging the gap between UI/UX design and frontend development. always looking for the next challenging project to tackle.
                                </p>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                                    <MapPin className="w-4 h-4 text-primary" /> San Francisco, CA
                                </div>
                                <div className="flex items-center gap-3 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                                    <Mail className="w-4 h-4 text-primary" /> samson@university.edu
                                </div>
                                <div className="flex items-center gap-3 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                                    <LinkIcon className="w-4 h-4 text-primary" /> github.com/samsonj
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <h3 className="text-lg font-bold text-text-main-light dark:text-white mb-4">Skills & Tools</h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm font-semibold mb-2 text-text-main-light dark:text-white">Design</p>
                                    <div className="flex flex-wrap gap-2">
                                        <Badge variant="info">Figma</Badge>
                                        <Badge variant="info">Adobe XD</Badge>
                                        <Badge variant="info">UI/UX</Badge>
                                        <Badge variant="info">Wireframing</Badge>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold mb-2 text-text-main-light dark:text-white">Development</p>
                                    <div className="flex flex-wrap gap-2">
                                        <Badge variant="default">React</Badge>
                                        <Badge variant="default">TypeScript</Badge>
                                        <Badge variant="default">Tailwind CSS</Badge>
                                        <Badge variant="default">Next.js</Badge>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <h3 className="text-lg font-bold text-text-main-light dark:text-white mb-4">Achievements</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4 p-3 rounded-xl bg-accent/20 border border-accent/30">
                                    <div className="p-2 bg-accent/30 rounded-lg text-yellow-800 shadow-sm border border-gray-900">
                                        <Award className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-text-main-light dark:text-white text-sm">Best UI Design 2025</h4>
                                        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">University Hackathon</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-3 rounded-xl bg-primary/20 border border-primary/30 mt-4">
                                    <div className="p-2 bg-primary/30 rounded-lg text-primary shadow-sm border border-gray-900">
                                        <Star className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-text-main-light dark:text-white text-sm">Dean's List</h4>
                                        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">Fall 2024, Spring 2025</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Highlighted Projects */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="text-xl font-bold text-text-main-light dark:text-white">Highlighted Projects</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[1, 2, 3, 4].map((item) => (
                            <Card key={item} className="overflow-hidden group hover:shadow-md transition-shadow cursor-pointer">
                                <div className="aspect-video bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
                                    {/* Mock Image Placeholder */}
                                    <div className="absolute inset-0 flex items-center justify-center text-text-secondary-light">
                                        Project Image {item}
                                    </div>
                                    <div className="absolute top-4 right-4">
                                        <Badge variant="success">Completed</Badge>
                                    </div>
                                </div>
                                <CardContent className="p-5">
                                    <h4 className="font-bold text-lg text-text-main-light dark:text-white mb-2 group-hover:text-primary transition-colors">
                                        {item === 1 ? 'React E-commerce Dashboard' : `Awesome Project ${item}`}
                                    </h4>
                                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-4 line-clamp-2">
                                        A brief description of this amazing project showcasing the skills and technologies used to build it.
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark bg-background-light dark:bg-background-dark px-2 py-1 rounded-md">React</span>
                                        <span className="text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark bg-background-light dark:bg-background-dark px-2 py-1 rounded-md">Tailwind</span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

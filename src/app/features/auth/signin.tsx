"use client";
import { signIn, useSession } from "next-auth/react";
import { SignOut } from "@/app/features/auth/signout";

export function SignIn() {
    const { data: session, status } = useSession();
    const isLoading = status === "loading";

    const handleSignIn = async () => {
        await signIn("keycloak", { callbackUrl: "/projects" });
    };

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center" style={{ background: 'var(--board-bg)' }}>
                <div style={{ color: 'var(--text-white)' }} className="text-xl">Loading...</div>
            </div>
        );
    }

    if (session) {
        return (
            <div className="flex min-h-screen items-center justify-center" style={{ background: 'var(--board-bg)' }}>
                <div className="flex flex-col items-center gap-4 backdrop-blur-xl rounded-3xl p-12 border" 
                     style={{ 
                         background: 'var(--column-bg)', 
                         borderColor: 'var(--border-color)',
                         boxShadow: 'var(--shadow-lg)'
                     }}>
                    <div style={{ color: 'var(--text-heading)' }} className="text-xl font-semibold">
                        Welcome, {session.user?.email || session.user?.name || "User"}!
                    </div>
                    <SignOut />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative overflow-hidden" 
             style={{ background: 'var(--board-bg)' }}>
            {/* Animated background shapes */}
            <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full opacity-30 blur-[80px] animate-float"
                 style={{ background: '#ec4899' }} />
            <div className="absolute bottom-[-50px] right-[-50px] w-[300px] h-[300px] rounded-full opacity-30 blur-[80px] animate-float-delayed"
                 style={{ background: '#a855f7' }} />
            <div className="absolute top-1/2 right-[10%] w-[250px] h-[250px] rounded-full opacity-30 blur-[80px] animate-float-slow"
                 style={{ background: '#8b5cf6' }} />

            {/* Main container */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-20">
                <div className="grid md:grid-cols-2 gap-12 items-center min-h-screen">
                    {/* Left side - Content */}
                    <div className="text-white space-y-8 animate-fadeInUp">
                        <div className="inline-block px-4 py-2 rounded-full border mb-4"
                             style={{ 
                                 background: 'rgba(255, 255, 255, 0.1)',
                                 borderColor: 'var(--border-color)'
                             }}>
                            <span className="text-sm font-medium">✨ The Future of Team Collaboration</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight drop-shadow-lg">
                            TaskFlow
                        </h1>

                        <p className="text-xl md:text-2xl font-light opacity-90 leading-relaxed">
                            Transform the way your team works together
                        </p>

                        <p className="text-base md:text-lg opacity-80 leading-relaxed">
                            TaskFlow brings your projects, tasks, and teams together in one unified workspace. 
                            Say goodbye to scattered tools and endless email threads. With intuitive boards, 
                            real-time collaboration, and powerful automation, managing projects has never been easier.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="text-2xl">🎯</div>
                                <div>
                                    <h3 className="font-semibold text-lg">Visual Project Tracking</h3>
                                    <p className="opacity-80 text-sm">Organize tasks with customizable kanban boards that adapt to your workflow</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="text-2xl">⚡</div>
                                <div>
                                    <h3 className="font-semibold text-lg">Real-Time Collaboration</h3>
                                    <p className="opacity-80 text-sm">Work together seamlessly with live updates and instant notifications</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="text-2xl">📊</div>
                                <div>
                                    <h3 className="font-semibold text-lg">Powerful Analytics</h3>
                                    <p className="opacity-80 text-sm">Track progress and identify bottlenecks with insightful reports and metrics</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <div className="text-center">
                                <div className="text-3xl font-bold">10K+</div>
                                <div className="text-sm opacity-80">Active Teams</div>
                            </div>
                            <div className="h-12 w-px bg-white opacity-20"></div>
                            <div className="text-center">
                                <div className="text-3xl font-bold">500K+</div>
                                <div className="text-sm opacity-80">Tasks Completed</div>
                            </div>
                            <div className="h-12 w-px bg-white opacity-20"></div>
                            <div className="text-center">
                                <div className="text-3xl font-bold">99.9%</div>
                                <div className="text-sm opacity-80">Uptime</div>
                            </div>
                        </div>
                    </div>

                    {/* Right side - Login Card */}
                    <div className="flex justify-center md:justify-end">
                        <div className="w-full max-w-md backdrop-blur-xl rounded-[30px] p-10 border animate-fadeInUp"
                             style={{ 
                                 background: 'rgba(255, 255, 255, 0.15)', 
                                 borderColor: 'var(--border-color)',
                                 boxShadow: 'var(--shadow-lg)',
                                 animationDelay: '0.2s'
                             }}>
                            <h2 className="text-white text-3xl font-bold mb-3">
                                Get Started
                            </h2>
                            
                            <p className="text-white/80 text-sm mb-8">
                                Sign in to access your workspace and start managing projects like never before.
                            </p>
                            
                            <button 
                                onClick={handleSignIn}
                                className="w-full relative border-none px-8 py-4 text-lg font-semibold rounded-full cursor-pointer transition-all duration-300 hover:-translate-y-1 active:-translate-y-0 overflow-hidden group mb-6"
                                style={{ 
                                    background: 'var(--text-white)',
                                    color: '#ec4899',
                                    boxShadow: 'var(--shadow-lg)'
                                }}
                            >
                                <span className="relative z-10">Sign In with SSO</span>
                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                            </button>

                            <div className="space-y-3 pt-6 border-t"
                                 style={{ borderColor: 'var(--border-color)' }}>
                                <div className="flex items-center gap-2 text-white/70 text-sm">
                                    <span>✓</span>
                                    <span>Enterprise-grade security</span>
                                </div>
                                <div className="flex items-center gap-2 text-white/70 text-sm">
                                    <span>✓</span>
                                    <span>No credit card required</span>
                                </div>
                                <div className="flex items-center gap-2 text-white/70 text-sm">
                                    <span>✓</span>
                                    <span>Free for small teams</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

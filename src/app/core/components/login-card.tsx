"use client";

interface LoginCardProps {
    onSignIn: () => void;
}

export function LoginCard({ onSignIn }: LoginCardProps) {
    const benefits = [
        'Enterprise-grade security',
        'No credit card required',
        'Free for small teams'
    ];

     return (
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
                    onClick={onSignIn}
                    className="w-full relative border-none px-8 py-4 text-lg font-semibold rounded-full cursor-pointer transition-all duration-300 hover:-translate-y-1 active:-translate-y-0 overflow-hidden group mb-6"
                    style={{ 
                        background: 'var(--text-white)',
                        color: '#6366f1',
                        boxShadow: 'var(--shadow-lg)'
                    }}
                >
                    <span className="relative z-10">Sign In with SSO</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                </button>

                <div className="space-y-3 pt-6 border-t"
                     style={{ borderColor: 'var(--border-color)' }}>
                    {benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-2 text-white/70 text-sm">
                            <span>✓</span>
                            <span>{benefit}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

"use client";

export function HomePageContent() {
    const features = [
        {
            icon: '🎯',
            title: 'Visual Project Tracking',
            description: 'Organize tasks with customizable kanban boards that adapt to your workflow'
        },
        {
            icon: '⚡',
            title: 'Real-Time Collaboration',
            description: 'Work together seamlessly with live updates and instant notifications'
        },
        {
            icon: '📊',
            title: 'Powerful Analytics',
            description: 'Track progress and identify bottlenecks with insightful reports and metrics'
        }
    ];

    const stats = [
        { value: '10K+', label: 'Active Teams' },
        { value: '500K+', label: 'Tasks Completed' },
        { value: '99.9%', label: 'Uptime' }
    ];

    return (
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
                {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                        <div className="text-2xl">{feature.icon}</div>
                        <div>
                            <h3 className="font-semibold text-lg">{feature.title}</h3>
                            <p className="opacity-80 text-sm">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
                {stats.map((stat, index) => (
                    <div key={index} className="flex items-center gap-4">
                        <div className="text-center">
                            <div className="text-3xl font-bold">{stat.value}</div>
                            <div className="text-sm opacity-80">{stat.label}</div>
                        </div>
                        {index < stats.length - 1 && (
                            <div className="h-12 w-px bg-white opacity-20"></div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

"use client";

import { Sidebar } from "@/app/core/components";
import { ProjectList } from "@/app/features/projects/project-list";
import { useSidebar } from "@/app/core/contexts/sidebar-context";
import { getSidebarPadding } from "@/app/core/utils/sidebar.utils";

export default function ProjectsPage() {
    const { isCollapsed } = useSidebar();

    return (
        <div className="min-h-screen bg-linear-to-r from-purple-500 to-indigo-600 p-6">
            <Sidebar />
            <div className={`max-w-5xl mx-auto transition-all duration-300 ${getSidebarPadding(isCollapsed)}`}>
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold text-white drop-shadow-lg">Projects</h1>
                </div>
                <ProjectList />
            </div>
        </div>
    );
}

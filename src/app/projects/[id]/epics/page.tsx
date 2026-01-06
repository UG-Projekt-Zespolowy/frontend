"use client";

import { useParams } from "next/navigation";
import { Sidebar, Button } from "@/app/core/components";
import { EpicList } from "@/app/features/epics/epic-list";
import { useProject } from "@/app/core/hooks";
import { useSidebar } from "@/app/core/contexts/sidebar-context";
import { getSidebarPadding } from "@/app/core/utils/sidebar.utils";

export default function ProjectEpicsPage() {
    const params = useParams();
    const projectId = params.id as string;
    const { isCollapsed } = useSidebar();
    const { data: project, isLoading } = useProject(projectId);

    if (!projectId) {
        return (
            <div className="min-h-screen bg-linear-to-r from-purple-500 to-indigo-600 p-6">
                <Sidebar />
                <div className="text-center text-white py-8">
                    <p>Invalid project ID</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-r from-purple-500 to-indigo-600 p-6">
            <Sidebar />
            <div className={`max-w-5xl mx-auto transition-all duration-300 ${getSidebarPadding(isCollapsed)}`}>
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold text-white drop-shadow-lg">
                        {isLoading ? "Epics" : project?.name ? `${project.name} – Epics` : "Epics"}
                    </h1>
                    <div className="flex gap-3">
                        <Button href="/projects" variant="secondary">
                            All projects
                        </Button>
                        <Button href={`/projects/${projectId}/board`} variant="secondary">
                            Board
                        </Button>
                    </div>
                </div>
                <EpicList projectId={projectId} />
            </div>
        </div>
    );
}



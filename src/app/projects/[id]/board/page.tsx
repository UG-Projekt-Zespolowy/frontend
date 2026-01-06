"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { KanbanBoard } from "@/app/features/board/kanban-board";
import { Button, Sidebar } from "@/app/core/components";
import { useSidebar } from "@/app/core/contexts/sidebar-context";
import { getSidebarPadding } from "@/app/core/utils/sidebar.utils";
import { useProject } from "@/app/core/hooks";
import { fetchWithAuth } from "@/app/core/api/api-client";

export default function BoardPage() {
    const params = useParams();
    const projectId = params.id as string;
    const { isCollapsed } = useSidebar();
    const { data: session } = useSession();
    const { data: project, isLoading: projectLoading } = useProject(projectId);

    useEffect(() => {
        const syncUser = async () => {
            if (!session) return;

            await fetchWithAuth("/api/v1/users");
        };
        syncUser();
    }, [session]);

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
            <div className={`max-w-7xl mx-auto transition-all duration-300 ${getSidebarPadding(isCollapsed)}`}>
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-white drop-shadow-lg">
                        {projectLoading ? "Loading..." : project?.name || "Project Name"}
                    </h1>
                    <div className="flex gap-3">
                        <Button href={`/projects/${projectId}/epics`} variant="secondary">
                            Epics
                        </Button>
                        <Button href={`/projects/${projectId}/backlog`} variant="secondary">
                            Backlog
                        </Button>
                        <Button href="/projects/form" variant="icon" ariaLabel="Add new project">
                            +
                        </Button>
                    </div>
                </div>
                <KanbanBoard projectId={params.id as string} />
            </div>
        </div>
    );
}


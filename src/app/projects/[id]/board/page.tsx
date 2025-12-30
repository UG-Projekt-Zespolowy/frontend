"use client";

import { KanbanBoard } from "@/app/features/board/kanban-board";
import { Button, Sidebar } from "@/app/core/components";
import { useSidebar } from "@/app/core/contexts/sidebar-context";
import { getSidebarPadding } from "@/app/core/utils/sidebar.utils";

interface BoardPageProps {
    params: {
        id: string;
    };
}

export default function BoardPage({ params }: BoardPageProps) {
    const { isCollapsed } = useSidebar();

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 p-6">
            <Sidebar />
            <div className={`max-w-7xl mx-auto transition-all duration-300 ${getSidebarPadding(isCollapsed)}`}>
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-white drop-shadow-lg">
                        Project Name
                    </h1>
                    <div className="flex gap-3">
                        <Button href="/epics" variant="secondary">
                            Epics
                        </Button>
                        <Button href={`/projects/${params.id}/backlog`} variant="secondary">
                            Backlog
                        </Button>
                        <Button href="/projects/form" variant="icon" ariaLabel="Add new project">
                            +
                        </Button>
                    </div>
                </div>
                <KanbanBoard />
            </div>
        </div>
    );
}


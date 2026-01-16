"use client";

import { useParams } from "next/navigation";
import { KanbanBoard } from "@/app/features/board/kanban-board";
import { Button, PageLayout, PageHeader, ProjectAccessGuard } from "@/app/core/components";
import { useProject, useUserSync } from "@/app/core/hooks";

export default function BoardPage() {
    const params = useParams();
    const projectId = params.id as string;
    const { data: project, isLoading: projectLoading } = useProject(projectId);

    useUserSync();

    return (
        <ProjectAccessGuard>
            <PageLayout maxWidth="7xl">
                <PageHeader
                    title={projectLoading ? "Loading..." : project?.name || "Project Name"}
                    actions={
                        <>
                            <Button href={`/projects/${projectId}/epics`} variant="secondary">
                                Epics
                            </Button>
                            <Button href={`/projects/${projectId}/members`} variant="secondary">
                                Members
                            </Button>
                            <Button href={`/projects/${projectId}/backlog`} variant="secondary">
                                Backlog
                            </Button>
                            <Button href="/projects/create" variant="icon" ariaLabel="Add new project">
                                +
                            </Button>
                        </>
                    }
                />
                <KanbanBoard projectId={projectId} />
            </PageLayout>
        </ProjectAccessGuard>
    );
}


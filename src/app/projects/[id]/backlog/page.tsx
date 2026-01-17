"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Button, PageHeader, PageLayout, ProjectAccessGuard, ErrorState } from "@/app/core/components";
import { useProject } from "@/app/core/hooks";
import { BacklogBoard } from "@/app/features/backlog/backlog-board";

export default function BacklogPage() {
    const params = useParams();
    const projectId = params.id as string;
    const router = useRouter();
    const searchParams = useSearchParams();
    const epicId = searchParams.get("epicId") || "";
    const { data: project, isLoading } = useProject(projectId);

    const title = isLoading ? "Backlog" : project?.name ? `${project.name} – Backlog` : "Backlog";

    return (
        <ProjectAccessGuard>
            <PageLayout maxWidth="7xl">
                <PageHeader
                    title={title}
                    actions={
                        <>
                            <Button href={`/projects/${projectId}/epics`} variant="secondary">
                                Epics
                            </Button>
                            <Button href={`/projects/${projectId}/board`} variant="secondary">
                                Board
                            </Button>
                            <Button href={`/projects/${projectId}/members`} variant="secondary">
                                Members
                            </Button>
                            <Button href="/projects/create" variant="icon" ariaLabel="Add new project">
                                +
                            </Button>
                        </>
                    }
                />
                {epicId ? (
                    <BacklogBoard epicId={epicId} />
                ) : (
                    <ErrorState
                        message="Select an epic to view its backlog."
                        onRetry={() => router.push(`/projects/${projectId}/epics`)}
                    />
                )}
            </PageLayout>
        </ProjectAccessGuard>
    );
}
"use client";

import { useParams } from "next/navigation";
import { PageLayout, PageHeader, ProjectAccessGuard, Button } from "@/app/core/components";
import { ProjectMembers } from "@/app/features/projects/project-members";
import { useProject } from "@/app/core/hooks";

export default function ProjectMembersPage() {
    const params = useParams();
    const projectId = params.id as string;
    const { data: project, isLoading } = useProject(projectId);

    const title = isLoading ? "Members" : project?.name ? `${project.name} – Members` : "Members";

    return (
        <ProjectAccessGuard>
            <PageLayout>
                <PageHeader
                    title={title}
                    actions={
                        <>
                            <Button href="/projects" variant="secondary">
                                All projects
                            </Button>
                            <Button href={`/projects/${projectId}/board`} variant="secondary">
                                Board
                            </Button>
                            <Button href={`/projects/${projectId}/epics`} variant="secondary">
                                Epics
                            </Button>
                        </>
                    }
                />
                <ProjectMembers projectId={projectId} />
            </PageLayout>
        </ProjectAccessGuard>
    );
}


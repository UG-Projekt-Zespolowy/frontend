"use client";

import { useParams } from "next/navigation";
import { Button, PageLayout, PageHeader } from "@/app/core/components";
import { EpicList } from "@/app/features/epics/epic-list";
import { useProject } from "@/app/core/hooks";

export default function ProjectEpicsPage() {
    const params = useParams();
    const projectId = params.id as string;
    const { data: project, isLoading } = useProject(projectId);

    if (!projectId) {
        return (
            <PageLayout>
                <div className="text-center text-white py-8">
                    <p>Invalid project ID</p>
                </div>
            </PageLayout>
        );
    }

    const title = isLoading ? "Epics" : project?.name ? `${project.name} – Epics` : "Epics";

    return (
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
                    </>
                }
            />
            <EpicList projectId={projectId} />
        </PageLayout>
    );
}



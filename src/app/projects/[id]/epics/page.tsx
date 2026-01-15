"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button, PageLayout, PageHeader, ProjectAccessGuard } from "@/app/core/components";
import { EpicList } from "@/app/features/epics/epic-list";
import { EpicCreateForm } from "@/app/features/epics/epic-create-form";
import { useProject } from "@/app/core/hooks";

export default function ProjectEpicsPage() {
    const params = useParams();
    const projectId = params.id as string;
    const { data: project, isLoading } = useProject(projectId);
    const [showCreateForm, setShowCreateForm] = useState(false);

    const title = isLoading ? "Epics" : project?.name ? `${project.name} – Epics` : "Epics";

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
                            <Button href={`/projects/${projectId}/members`} variant="secondary">
                                Members
                            </Button>
                            <Button
                                onClick={() => setShowCreateForm(!showCreateForm)}
                                variant="primary"
                            >
                                {showCreateForm ? "Cancel" : "+ New Epic"}
                            </Button>
                        </>
                    }
                />
                {showCreateForm && (
                    <div className="mb-6">
                        <EpicCreateForm
                            projectId={projectId}
                            onCancel={() => setShowCreateForm(false)}
                        />
                    </div>
                )}
                <EpicList projectId={projectId} />
            </PageLayout>
        </ProjectAccessGuard>
    );
}



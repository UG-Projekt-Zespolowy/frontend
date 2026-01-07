"use client";

import { Button, PageLayout, PageHeader } from "@/app/core/components";
import { ProjectList } from "@/app/features/projects/project-list";

export default function ProjectsPage() {
    return (
        <PageLayout>
            <PageHeader
                title="Projects"
                actions={
                    <Button href="/projects/create" variant="primary">
                        + New Project
                    </Button>
                }
            />
            <ProjectList />
        </PageLayout>
    );
}

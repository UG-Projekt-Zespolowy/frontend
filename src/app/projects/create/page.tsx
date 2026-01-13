"use client";

import { useRouter } from "next/navigation";
import { PageLayout, PageHeader } from "@/app/core/components";
import { ProjectCreateForm } from "@/app/features/projects/project-create-form";

export default function ProjectCreatePage() {
    const router = useRouter();

    return (
        <PageLayout maxWidth="4xl">
            <PageHeader title="New Project" />
            <ProjectCreateForm onCancel={() => router.push("/projects")} />
        </PageLayout>
    );
}


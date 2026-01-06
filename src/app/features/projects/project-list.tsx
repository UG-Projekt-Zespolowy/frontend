"use client";

import { useRouter } from "next/navigation";
import { memo } from "react";
import { LoadingState, ErrorState, EmptyState } from "@/app/core/components";
import { useProjects } from "@/app/core/hooks";
import type { Project } from "@/app/core/types";

export const ProjectList = memo(function ProjectList() {
    const router = useRouter();
    const { data, isLoading, error, refetch } = useProjects(0, 100);

    if (isLoading) {
        return <LoadingState message="Loading projects..." />;
    }

    if (error) {
        return (
            <ErrorState
                message="Failed to load projects. Please try again."
                onRetry={() => refetch()}
            />
        );
    }

    if (!data?.content || data.content.length === 0) {
        return <EmptyState message="No projects available." />;
    }

    return (
        <div className="space-y-4">
            {data.content.map((project: Project) => (
                <button
                    key={project.id}
                    type="button"
                    onClick={() => router.push(`/projects/${project.id}/epics`)}
                    className="w-full text-left p-4 bg-white/90 rounded-xl shadow-md border border-white/40 transition-colors hover:bg-white hover:cursor-pointer"
                >
                    <h2 className="text-lg font-semibold text-gray-900">{project.name}</h2>
                    {project.description && (
                        <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                            {project.description}
                        </p>
                    )}
                </button>
            ))}
        </div>
    );
});

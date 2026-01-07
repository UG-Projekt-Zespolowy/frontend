"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { memo } from "react";
import { LoadingState, ErrorState, EmptyState, ProjectDeleteModal } from "@/app/core/components";
import { useProjects, useDeleteProject } from "@/app/core/hooks";
import type { Project } from "@/app/core/types";

export const ProjectList = memo(function ProjectList() {
    const router = useRouter();
    const { data, isLoading, error, refetch } = useProjects(0, 100);
    const { mutate: deleteProject, isPending: isDeleting, error: deleteError } = useDeleteProject();
    const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

    const handleDeleteClick = (e: React.MouseEvent, project: Project) => {
        e.stopPropagation();
        setProjectToDelete(project);
    };

    const handleDeleteConfirm = () => {
        if (projectToDelete) {
            deleteProject(projectToDelete.id, {
                onSuccess: () => {
                    setProjectToDelete(null);
                },
            });
        }
    };

    const handleCloseModal = () => {
        setProjectToDelete(null);
    };

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
        <>
            <div className="space-y-4">
                {data.content.map((project: Project) => (
                    <div
                        key={project.id}
                        className="relative w-full p-4 bg-white/90 rounded-xl shadow-md border border-white/40 transition-colors hover:bg-white hover:cursor-pointer"
                    >
                        <button
                            type="button"
                            onClick={() => router.push(`/projects/${project.id}/epics`)}
                            className="w-full text-left hover:cursor-pointer"
                        >
                            <h2 className="text-lg font-semibold text-gray-900 pr-12">{project.name}</h2>
                            {project.description && (
                                <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                                    {project.description}
                                </p>
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={(e) => handleDeleteClick(e, project)}
                            className="absolute top-4 right-4 p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors hover:cursor-pointer"
                            aria-label="Delete project"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>

            {projectToDelete && (
                <ProjectDeleteModal
                    project={projectToDelete}
                    isOpen={!!projectToDelete}
                    onClose={handleCloseModal}
                    onConfirm={handleDeleteConfirm}
                    isDeleting={isDeleting}
                    error={deleteError}
                />
            )}
        </>
    );
});

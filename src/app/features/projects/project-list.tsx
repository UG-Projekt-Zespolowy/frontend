"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { memo } from "react";
import { LoadingState, ErrorState, EmptyState, ProjectDeleteModal, ProjectEditModal } from "@/app/core/components";
import { useProjects, useDeleteProject, useUpdateProject } from "@/app/core/hooks";
import type { Project } from "@/app/core/types";

export const ProjectList = memo(function ProjectList() {
    const router = useRouter();
    const { data, isLoading, error, refetch } = useProjects(0, 100);
    const { mutate: deleteProject, isPending: isDeleting, error: deleteError } = useDeleteProject();
    const { mutate: updateProject, isPending: isUpdating, error: updateError } = useUpdateProject();
    const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
    const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);

    const handleDeleteClick = (e: React.MouseEvent, project: Project) => {
        e.stopPropagation();
        setProjectToDelete(project);
    };

    const handleEditClick = (e: React.MouseEvent, project: Project) => {
        e.stopPropagation();
        setProjectToEdit(project);
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

    const handleEditConfirm = (name: string, description: string) => {
        if (projectToEdit) {
            updateProject(
                {
                    projectId: projectToEdit.id,
                    name,
                    description: description || undefined,
                },
                {
                    onSuccess: () => {
                        setProjectToEdit(null);
                    },
                }
            );
        }
    };

    const handleCloseDeleteModal = () => {
        setProjectToDelete(null);
    };

    const handleCloseEditModal = () => {
        setProjectToEdit(null);
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
                            <h2 className="text-lg font-semibold text-gray-900 pr-24">{project.name}</h2>
                            {project.description && (
                                <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                                    {project.description}
                                </p>
                            )}
                        </button>
                        <div className="absolute top-4 right-4 flex gap-2">
                            <button
                                type="button"
                                onClick={(e) => handleEditClick(e, project)}
                                className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors hover:cursor-pointer"
                                aria-label="Edit project"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                            </button>
                            <button
                                type="button"
                                onClick={(e) => handleDeleteClick(e, project)}
                                className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors hover:cursor-pointer"
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
                    </div>
                ))}
            </div>

            {projectToEdit && (
                <ProjectEditModal
                    project={projectToEdit}
                    isOpen={!!projectToEdit}
                    onClose={handleCloseEditModal}
                    onConfirm={handleEditConfirm}
                    isUpdating={isUpdating}
                    error={updateError}
                />
            )}

            {projectToDelete && (
                <ProjectDeleteModal
                    project={projectToDelete}
                    isOpen={!!projectToDelete}
                    onClose={handleCloseDeleteModal}
                    onConfirm={handleDeleteConfirm}
                    isDeleting={isDeleting}
                    error={deleteError}
                />
            )}
        </>
    );
});

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { memo } from "react";
import { LoadingState, ErrorState, EmptyState, EpicEditModal, EpicDeleteModal } from "@/app/core/components";
import { useProjectEpics, useUpdateEpic, useDeleteEpic } from "@/app/core/hooks";
import type { Epic } from "@/app/core/types";

interface EpicListProps {
    readonly projectId: string;
}

export const EpicList = memo(function EpicList({ projectId }: EpicListProps) {
    const router = useRouter();
    const { data, isLoading, error, refetch } = useProjectEpics(projectId, 0, 100);
    const { mutate: updateEpic, isPending: isUpdating, error: updateError } = useUpdateEpic();
    const { mutate: deleteEpic, isPending: isDeleting, error: deleteError } = useDeleteEpic();
    const [epicToEdit, setEpicToEdit] = useState<Epic | null>(null);
    const [epicToDelete, setEpicToDelete] = useState<Epic | null>(null);

    const handleDeleteClick = (e: React.MouseEvent, epic: Epic) => {
        e.stopPropagation();
        setEpicToDelete(epic);
    };

    const handleEditClick = (e: React.MouseEvent, epic: Epic) => {
        e.stopPropagation();
        setEpicToEdit(epic);
    };

    const handleDeleteConfirm = () => {
        if (epicToDelete) {
            deleteEpic(
                {
                    epicId: epicToDelete.id,
                    projectId: epicToDelete.projectId,
                },
                {
                    onSuccess: () => {
                        setEpicToDelete(null);
                    },
                }
            );
        }
    };

    const handleEditConfirm = (title: string, description: string) => {
        if (epicToEdit) {
            updateEpic(
                {
                    epicId: epicToEdit.id,
                    title,
                    description: description || undefined,
                },
                {
                    onSuccess: () => {
                        setEpicToEdit(null);
                    },
                }
            );
        }
    };

    const handleCloseDeleteModal = () => {
        setEpicToDelete(null);
    };

    const handleCloseEditModal = () => {
        setEpicToEdit(null);
    };

    if (isLoading) {
        return <LoadingState message="Loading epics..." />;
    }

    if (error) {
        return (
            <ErrorState
                message="Failed to load epics. Please try again."
                onRetry={() => refetch()}
            />
        );
    }

    if (!data?.content || data.content.length === 0) {
        return <EmptyState message="No epics for this project." />;
    }

    return (
        <>
            <div className="space-y-4">
                {data.content.map((epic: Epic) => (
                    <div
                        key={epic.id}
                        className="relative w-full p-4 bg-white/90 rounded-xl shadow-md border border-white/40 transition-colors hover:bg-white hover:cursor-pointer"
                    >
                        <button
                            type="button"
                            onClick={() => router.push(`/epics/${epic.id}`)}
                            className="w-full text-left hover:cursor-pointer pr-24"
                        >
                            <h2 className="text-lg font-semibold text-gray-900">{epic.title}</h2>
                            {epic.description && (
                                <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                                    {epic.description}
                                </p>
                            )}
                        </button>
                        <div className="absolute top-4 right-4 flex gap-2">
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    router.push(`/projects/${projectId}/backlog?epicId=${epic.id}`);
                                }}
                                className="px-3 py-1.5 text-sm text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors hover:cursor-pointer font-medium"
                                aria-label="View backlog"
                            >
                                Backlog
                            </button>
                            <button
                                type="button"
                                onClick={(e) => handleEditClick(e, epic)}
                                className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors hover:cursor-pointer"
                                aria-label="Edit epic"
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
                                onClick={(e) => handleDeleteClick(e, epic)}
                                className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors hover:cursor-pointer"
                                aria-label="Delete epic"
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

            {epicToEdit && (
                <EpicEditModal
                    epic={epicToEdit}
                    isOpen={!!epicToEdit}
                    onClose={handleCloseEditModal}
                    onConfirm={handleEditConfirm}
                    isUpdating={isUpdating}
                    error={updateError}
                />
            )}

            {epicToDelete && (
                <EpicDeleteModal
                    epic={epicToDelete}
                    isOpen={!!epicToDelete}
                    onClose={handleCloseDeleteModal}
                    onConfirm={handleDeleteConfirm}
                    isDeleting={isDeleting}
                    error={deleteError}
                />
            )}
        </>
    );
});



"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { PageLayout, LoadingState, ErrorState } from "@/app/core/components";
import { useIssue, useUser, useUsers } from "@/app/core/hooks";
import { IssueDeleteModal } from "@/app/features/issues/issue-delete-modal";
import { IssueEditForm } from "@/app/features/issues/issue-edit-form";
import { IssueHeader, IssueDetails } from "@/app/features/issues/components";
import { useIssueActions } from "@/app/features/issues/hooks/use-issue-actions";
import { useIssueAssignee } from "@/app/features/issues/hooks/use-issue-assignee";

export default function IssueDetailPage() {
    const params = useParams();
    const router = useRouter();
    const issueId = params.id as string;
    const { data: issue, isLoading, error, refetch } = useIssue(issueId);
    const { data: reporter } = useUser(issue?.reporterId || "");
    const { data: assignee } = useUser(issue?.assigneeId || "");
    const { data: usersData } = useUsers(0, 100);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const {
        handleDelete,
        handleClose,
        handleOpen,
        handleUpdate,
        isUpdating,
        isDeleting,
        isClosing,
        isOpening,
    } = useIssueActions({ issue: issue! });

    const {
        isEditing: isAssigneeEditing,
        isAssigning,
        handleStartEdit: handleStartAssigneeEdit,
        handleCancelEdit: handleCancelAssigneeEdit,
        handleAssign,
        handleUnassign,
    } = useIssueAssignee({ issue: issue! });

    const allUsers = useMemo(() => usersData?.content || [], [usersData]);
    const isProcessing = isUpdating || isDeleting || isClosing || isOpening || isAssigning;

    if (isLoading) {
        return (
            <PageLayout>
                <LoadingState message="Loading issue..." />
            </PageLayout>
        );
    }

    if (error || !issue) {
        return (
            <PageLayout>
                <ErrorState message="Failed to load issue. Please try again." />
            </PageLayout>
        );
    }

    const handleUpdateWithRefetch = (
        title: string,
        description: string,
        storyPoint: number | undefined,
        status: string,
        assigneeId: string | null
    ) => {
        handleUpdate(title, description, storyPoint, status, assigneeId);
        setShowEditForm(false);
        refetch();
    };

    return (
        <PageLayout maxWidth="4xl">
            <IssueHeader
                issue={issue}
                isProcessing={isProcessing}
                onEdit={() => setShowEditForm(!showEditForm)}
                onClose={handleClose}
                onOpen={handleOpen}
                onDelete={() => setShowDeleteModal(true)}
                onBack={() => router.back()}
                isEditMode={showEditForm}
                isOpening={isOpening}
                isClosing={isClosing}
            />

            {showEditForm ? (
                <div className="mt-6">
                    <IssueEditForm
                        issue={issue}
                        onCancel={() => setShowEditForm(false)}
                        onSave={handleUpdateWithRefetch}
                        isSaving={isUpdating}
                    />
                </div>
            ) : (
                <IssueDetails
                    issue={issue}
                    reporter={reporter}
                    assignee={assignee}
                    users={allUsers}
                    isAssigneeEditing={isAssigneeEditing}
                    isAssigning={isAssigning}
                    onStartAssigneeEdit={handleStartAssigneeEdit}
                    onAssign={handleAssign}
                    onUnassign={handleUnassign}
                    onCancelAssigneeEdit={handleCancelAssigneeEdit}
                />
            )}

            {showDeleteModal && (
                <IssueDeleteModal
                    issue={issue}
                    isOpen={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onConfirm={handleDelete}
                    isDeleting={isDeleting}
                />
            )}
        </PageLayout>
    );
}

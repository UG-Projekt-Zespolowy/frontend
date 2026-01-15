"use client";

import { useRouter } from "next/navigation";
import { useUpdateIssue, useDeleteIssue, useCloseIssue, useUpdateIssueStatus } from "@/app/core/hooks";
import type { Issue } from "@/app/core/types";

interface UseIssueActionsProps {
    readonly issue: Issue;
}

export function useIssueActions({ issue }: UseIssueActionsProps) {
    const router = useRouter();
    const { mutate: updateIssue, isPending: isUpdating } = useUpdateIssue();
    const { mutate: deleteIssue, isPending: isDeleting } = useDeleteIssue();
    const { mutate: closeIssue, isPending: isClosing } = useCloseIssue();
    const { mutate: updateIssueStatus, isPending: isOpening } = useUpdateIssueStatus();

    const handleDelete = () => {
        deleteIssue(
            { issueId: issue.id },
            {
                onSuccess: () => {
                    router.back();
                },
            }
        );
    };

    const handleClose = () => {
        closeIssue(
            { issueId: issue.id, status: "CLOSED" },
            {
                onSuccess: () => {},
            }
        );
    };

    const handleOpen = () => {
        updateIssueStatus(
            { issueId: issue.id, status: "TO_DO" },
            {
                onSuccess: () => {},
            }
        );
    };

    const handleUpdate = (
        title: string,
        description: string,
        storyPoint: number | undefined,
        status: string,
        assigneeId: string | null
    ) => {
        updateIssue(
            {
                issueId: issue.id,
                request: {
                    title,
                    description: description || "",
                    storyPoint: storyPoint || undefined,
                    status,
                    assigneeId: assigneeId || undefined,
                },
            },
            {
                onSuccess: () => {},
            }
        );
    };

    return {
        handleDelete,
        handleClose,
        handleOpen,
        handleUpdate,
        isUpdating,
        isDeleting,
        isClosing,
        isOpening,
    };
}

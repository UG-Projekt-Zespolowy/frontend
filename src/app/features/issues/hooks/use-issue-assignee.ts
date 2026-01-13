"use client";

import { useState } from "react";
import { useAssignIssue, useUpdateIssue } from "@/app/core/hooks";
import type { Issue } from "@/app/core/types";

interface UseIssueAssigneeProps {
    readonly issue: Issue;
}

export function useIssueAssignee({ issue }: UseIssueAssigneeProps) {
    const [isEditing, setIsEditing] = useState(false);
    const { mutate: assignIssue, isPending: isAssigning } = useAssignIssue();
    const { mutate: updateIssue } = useUpdateIssue();

    const handleStartEdit = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    const handleAssign = (assigneeId: string) => {
        assignIssue(
            { issueId: issue.id, assigneeId },
            {
                onSuccess: () => {
                    setIsEditing(false);
                },
            }
        );
    };

    const handleUnassign = () => {
        updateIssue(
            {
                issueId: issue.id,
                request: {
                    title: issue.title,
                    description: issue.description || "",
                    storyPoint: issue.storyPoint || undefined,
                    status: issue.status,
                    assigneeId: undefined,
                },
            },
            {
                onSuccess: () => {
                    setIsEditing(false);
                },
            }
        );
    };

    return {
        isEditing,
        isAssigning,
        handleStartEdit,
        handleCancelEdit,
        handleAssign,
        handleUnassign,
    };
}

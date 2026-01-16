"use client";

import { useState } from "react";
import { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { COLUMN_TO_STATUS_MAP } from "@/app/features/board/constants/status-mapping";
import type { Issue } from "@/app/features/board/issues";
import type { UseMutationResult } from "@tanstack/react-query";

interface Column {
    readonly id: string;
    readonly issues: readonly Issue[];
}

interface UseDragHandlersProps {
    readonly columns: readonly Column[];
    readonly updateIssueStatus: UseMutationResult<Issue, Error, { issueId: string; status: string }>["mutate"];
    readonly refetch: () => void;
}

export function useDragHandlers({ columns, updateIssueStatus, refetch }: UseDragHandlersProps) {
    const [activeIssue, setActiveIssue] = useState<Issue | null>(null);

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        const issue = columns
            .flatMap((col) => col.issues)
            .find((issue) => issue.id === active.id);
        setActiveIssue(issue || null);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        setActiveIssue(null);
        const { active, over } = event;

        if (!over) {
            return;
        }

        const activeIssue = columns
            .flatMap((col) => col.issues)
            .find((issue) => issue.id === active.id);

        if (!activeIssue) {
            return;
        }

        const activeColumn = columns.find((col) => col.issues.some((issue) => issue.id === active.id));
        if (!activeColumn) {
            return;
        }

        const overId = typeof over.id === "string" ? over.id : String(over.id);

        let overColumnId = overId;

        const overIssue = columns
            .flatMap((col) => col.issues)
            .find((issue) => issue.id === overId);

        if (overIssue) {
            const overIssueColumn = columns.find((col) => col.issues.some((issue) => issue.id === overId));
            if (overIssueColumn) {
                overColumnId = overIssueColumn.id;
            }
        } else {
            const overColumn = columns.find((col) => col.id === overId);
            if (overColumn) {
                overColumnId = overColumn.id;
            }
        }

        if (activeColumn.id === overColumnId) {
            return;
        }

        const newStatus = COLUMN_TO_STATUS_MAP[overColumnId];
        if (!newStatus) {
            return;
        }

        updateIssueStatus(
            { issueId: activeIssue.id, status: newStatus },
            {
                onSuccess: () => {
                    refetch();
                },
            }
        );
    };

    return {
        activeIssue,
        handleDragStart,
        handleDragEnd,
    };
}
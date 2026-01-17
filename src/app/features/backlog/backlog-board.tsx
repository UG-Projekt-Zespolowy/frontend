"use client";

import { useMemo } from "react";
import { IssueSearch, type Issue as BoardIssue } from "@/app/features/board/issues";
import { KanbanColumn } from "@/app/features/board/kanban-column";
import { useBacklogIssues, type Issue as ApiIssue } from "@/app/core/hooks";
import { LoadingState, ErrorState } from "@/app/core/components";

interface BacklogBoardProps {
    readonly epicId: string;
}

function mapApiIssueToBoardIssue(apiIssue: ApiIssue): BoardIssue {
    return {
        id: apiIssue.id,
        title: apiIssue.title,
        description: apiIssue.description || "",
    };
}

export function BacklogBoard({ epicId }: BacklogBoardProps) {
    const { data: backlogData, isLoading, error, refetch } = useBacklogIssues(epicId, 0, 100);

    const allIssues: readonly BoardIssue[] = useMemo(() => {
        if (!backlogData?.content) {
            return [];
        }
        return backlogData.content.map(mapApiIssueToBoardIssue);
    }, [backlogData]);

    if (isLoading) {
        return <LoadingState message="Loading backlog issues..." />;
    }

    if (error) {
        return (
            <ErrorState
                message="Failed to load backlog issues. Please try again."
                onRetry={() => refetch()}
            />
        );
    }

    return (
        <div>
            <div className="mb-6">
                <IssueSearch issues={allIssues} />
            </div>
            <KanbanColumn id="backlog" title="Backlog" issues={allIssues} />
        </div>
    );
}
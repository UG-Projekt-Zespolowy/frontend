"use client";

import { useMemo, memo } from "react";
import { IssueSearch, type Issue } from "@/app/features/board/issues";
import { useProjectEpics, type Issue as ApiIssue, useProjectIssues } from "@/app/core/hooks";
import { EpicBoard } from "@/app/features/board/epic-board";
import { LoadingState, ErrorState, EmptyState } from "@/app/core/components";

interface KanbanBoardProps {
    readonly projectId: string;
}

function mapApiIssueToBoardIssue(apiIssue: ApiIssue): Issue {
    return {
        id: apiIssue.id,
        title: apiIssue.title,
        description: apiIssue.description || "",
    };
}

export const KanbanBoard = memo(function KanbanBoard({ projectId }: KanbanBoardProps) {
    const { data: epicsData, isLoading: epicsLoading, error: epicsError, refetch } = useProjectEpics(projectId, 0, 100);
    const { data: allProjectIssues } = useProjectIssues(projectId, 0, 1000);

    const allIssues: readonly Issue[] = useMemo(() => {
        if (!allProjectIssues?.content) {
            return [];
        }
        return allProjectIssues.content.map(mapApiIssueToBoardIssue);
    }, [allProjectIssues]);

    if (epicsLoading) {
        return <LoadingState message="Loading epics..." />;
    }

    if (epicsError) {
        return (
            <ErrorState
                message="Failed to load epics. Please try again."
                onRetry={() => refetch()}
            />
        );
    }

    if (!epicsData?.content || epicsData.content.length === 0) {
        return <EmptyState message="No epics found for this project." />;
    }

    return (
        <div>
            <div className="mb-6">
                <IssueSearch issues={allIssues} />
            </div>
            <div>
                {epicsData.content.map((epic) => (
                    <EpicBoard key={epic.id} epicId={epic.id} epicTitle={epic.title} />
                ))}
            </div>
        </div>
    );
});

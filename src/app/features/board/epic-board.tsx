"use client";

import { useMemo, memo } from "react";
import { KanbanColumn } from "@/app/features/board/kanban-column";
import { type Issue } from "@/app/features/board/issues";
import { COLUMN_IDS, COLUMN_TITLES } from "@/app/features/board/constants/board.constants";
import { useEpicIssues, type Issue as ApiIssue } from "@/app/core/hooks";
import { LoadingState, ErrorState } from "@/app/core/components";

interface EpicBoardProps {
    readonly epicId: string;
    readonly epicTitle: string;
}

const STATUS_TO_COLUMN_MAP: Readonly<Record<string, string>> = {
    TO_DO: COLUMN_IDS.TODO,
    IN_PROGRESS: COLUMN_IDS.IN_PROGRESS,
    READY_FOR_REVIEW: COLUMN_IDS.READY_FOR_REVIEW,
    DONE: COLUMN_IDS.DONE,
    CLOSED: COLUMN_IDS.CLOSED,
} as const;

const DEFAULT_COLUMNS: ReadonlyArray<{ id: string; title: string; issues: Issue[] }> = [
    { id: COLUMN_IDS.TODO, title: COLUMN_TITLES[COLUMN_IDS.TODO], issues: [] },
    { id: COLUMN_IDS.IN_PROGRESS, title: COLUMN_TITLES[COLUMN_IDS.IN_PROGRESS], issues: [] },
    { id: COLUMN_IDS.READY_FOR_REVIEW, title: COLUMN_TITLES[COLUMN_IDS.READY_FOR_REVIEW], issues: [] },
    { id: COLUMN_IDS.DONE, title: COLUMN_TITLES[COLUMN_IDS.DONE], issues: [] },
    { id: COLUMN_IDS.CLOSED, title: COLUMN_TITLES[COLUMN_IDS.CLOSED], issues: [] },
] as const;

function mapApiIssueToBoardIssue(apiIssue: ApiIssue): Issue {
    return {
        id: apiIssue.id,
        title: apiIssue.title,
        description: apiIssue.description || "",
    };
}

export const EpicBoard = memo(function EpicBoard({ epicId, epicTitle }: EpicBoardProps) {
    const { data: issuesData, isLoading, error, refetch } = useEpicIssues(epicId, 0, 100);

    const columns = useMemo(() => {
        if (!issuesData?.content) {
            return DEFAULT_COLUMNS.map((col) => ({ ...col, issues: [] }));
        }

        const issuesByStatus = issuesData.content.reduce(
            (acc, apiIssue) => {
                const columnId = STATUS_TO_COLUMN_MAP[apiIssue.status] || COLUMN_IDS.TODO;
                if (!acc[columnId]) {
                    acc[columnId] = [];
                }
                acc[columnId].push(mapApiIssueToBoardIssue(apiIssue));
                return acc;
            },
            {} as Record<string, Issue[]>
        );

        return DEFAULT_COLUMNS.map((column) => ({
            ...column,
            issues: issuesByStatus[column.id] || [],
        }));
    }, [issuesData]);

    if (isLoading) {
        return <LoadingState message="Loading issues..." />;
    }

    if (error) {
        return (
            <ErrorState
                message="Failed to load issues. Please try again."
                onRetry={() => refetch()}
            />
        );
    }

    return (
        <div className="mb-8 p-6 bg-white/10 rounded-xl shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-6 drop-shadow-lg">{epicTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {columns.map((column) => (
                    <KanbanColumn
                        key={column.id}
                        id={column.id}
                        title={column.title}
                        issues={column.issues}
                    />
                ))}
            </div>
        </div>
    );
});

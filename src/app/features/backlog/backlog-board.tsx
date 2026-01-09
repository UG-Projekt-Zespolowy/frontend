"use client";

import { useMemo } from "react";
import { IssueCard, IssueSearch, type Issue as BoardIssue } from "@/app/features/board/issues";
import { BACKLOG_MIN_HEIGHT } from "@/app/features/backlog/constants/backlog-board.constants";
import { useBacklogIssues, type Issue as ApiIssue } from "@/app/core/hooks";
import { LoadingState, ErrorState } from "@/app/core/components";

interface BacklogBoardProps {
    readonly projectId: string;
}

function mapApiIssueToBoardIssue(apiIssue: ApiIssue): BoardIssue {
    return {
        id: apiIssue.id,
        title: apiIssue.title,
        description: apiIssue.description || "",
    };
}

export function BacklogBoard({ projectId }: BacklogBoardProps) {
    const { data: backlogData, isLoading, error, refetch } = useBacklogIssues(projectId, 0, 100);

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
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-5 border border-white/30" style={{ minHeight: `${BACKLOG_MIN_HEIGHT}px` }}>
                <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-3 border-b border-purple-200">
                    Backlog
                </h2>
                {allIssues.length > 0 ? (
                    <div className="space-y-3">
                        {allIssues.map((issue) => (
                            <IssueCard key={issue.id} issue={issue} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-400 py-8 italic">No issues in the backlog.</div>
                )}
            </div>
        </div>
    );
}
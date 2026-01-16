"use client";

import { useMemo } from "react";
import { COLUMN_IDS, COLUMN_TITLES } from "@/app/features/board/constants/board.constants";
import { STATUS_TO_COLUMN_MAP } from "@/app/features/board/constants/status-mapping";
import type { Issue } from "@/app/features/board/issues";
import type { Issue as ApiIssue, PageResponse } from "@/app/core/types";

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

export function useEpicColumns(issuesData: PageResponse<ApiIssue> | undefined) {
    return useMemo(() => {
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
}


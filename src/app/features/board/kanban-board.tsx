"use client";

import { useMemo } from "react";
import { KanbanColumn } from "@/app/features/board/kanban-column";
import { IssueSearch, type Issue } from "@/app/features/board/issues";
import { type Column } from "@/app/features/board/types";
import { COLUMN_IDS, COLUMN_TITLES } from "@/app/features/board/constants/board.constants";

const MOCK_COLUMNS: readonly Column[] = [
    {
        id: COLUMN_IDS.TODO,
        title: COLUMN_TITLES[COLUMN_IDS.TODO],
        issues: [
            { id: "1", title: "Issue 1", description: "Description for issue 1" },
            { id: "2", title: "Issue 2", description: "Description for issue 2" },
        ],
    },
    {
        id: COLUMN_IDS.IN_PROGRESS,
        title: COLUMN_TITLES[COLUMN_IDS.IN_PROGRESS],
        issues: [
            { id: "3", title: "Issue 3", description: "Description for issue 3" },
        ],
    },
    {
        id: COLUMN_IDS.READY_FOR_REVIEW,
        title: COLUMN_TITLES[COLUMN_IDS.READY_FOR_REVIEW],
        issues: [
            { id: "5", title: "Issue 5", description: "Description for issue 5" },
        ],
    },
    {
        id: COLUMN_IDS.DONE,
        title: COLUMN_TITLES[COLUMN_IDS.DONE],
        issues: [
            { id: "4", title: "Issue 4", description: "Description for issue 4" },
        ],
    },
    {
        id: COLUMN_IDS.CLOSED,
        title: COLUMN_TITLES[COLUMN_IDS.CLOSED],
        issues: [],
    },
] as const;

export function KanbanBoard() {
    const columns = useMemo(() => MOCK_COLUMNS, []);

    const allIssues: readonly Issue[] = useMemo(() => {
        return columns.flatMap((column) => column.issues);
    }, [columns]);

    return (
        <div>
            <div className="mb-6">
                <IssueSearch issues={allIssues} />
            </div>
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
}

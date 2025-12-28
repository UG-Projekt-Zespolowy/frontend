"use client";

import { IssueCard } from "@/app/features/board/issues";
import { type Issue } from "@/app/features/board/issues";
import { COLUMN_MIN_HEIGHT } from "@/app/features/board/constants/board.constants";

interface KanbanColumnProps {
    readonly id: string;
    readonly title: string;
    readonly issues: readonly Issue[];
}

export function KanbanColumn({ title, issues }: KanbanColumnProps) {
    return (
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-5 border border-white/30" style={{ minHeight: `${COLUMN_MIN_HEIGHT}px` }}>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-3 border-b border-purple-200">
                {title}
            </h2>
            <div className="space-y-3">
                {issues.map((issue) => (
                    <IssueCard key={issue.id} issue={issue} />
                ))}
                {issues.length === 0 && (
                    <div className="text-center text-gray-400 py-8 italic">No issues</div>
                )}
            </div>
        </div>
    );
}

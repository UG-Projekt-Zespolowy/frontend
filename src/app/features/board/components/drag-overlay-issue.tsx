"use client";

import { memo } from "react";
import type { Issue } from "@/app/features/board/issues";

interface DragOverlayIssueProps {
    readonly issue: Issue;
}

export const DragOverlayIssue = memo(function DragOverlayIssue({ issue }: DragOverlayIssueProps) {
    return (
        <div className="bg-linear-to-br from-purple-50 to-indigo-50 rounded-lg p-4 border border-purple-300 shadow-xl opacity-90 rotate-3">
            <h3 className="font-semibold text-gray-800 mb-1">{issue.title}</h3>
            {issue.description && (
                <p className="text-sm text-gray-600 line-clamp-2">{issue.description}</p>
            )}
        </div>
    );
});

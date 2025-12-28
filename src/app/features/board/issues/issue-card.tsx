"use client";

import { type Issue } from "@/app/features/board/issues/types/issue.types";

interface IssueCardProps {
    readonly issue: Issue;
}

export function IssueCard({ issue }: IssueCardProps) {
    return (
        <div className="bg-linear-to-br from-purple-50 to-indigo-50 rounded-lg p-4 hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer border border-purple-200/50 hover:border-purple-300">
            <h3 className="font-semibold text-gray-800 mb-1">{issue.title}</h3>
            {issue.description && (
                <p className="text-sm text-gray-600">{issue.description}</p>
            )}
        </div>
    );
}


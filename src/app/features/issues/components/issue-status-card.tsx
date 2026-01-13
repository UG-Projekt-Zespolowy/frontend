"use client";

import { memo } from "react";
import { getStatusColor } from "@/app/features/board/utils/status.utils";

interface IssueStatusCardProps {
    readonly status: string;
}

export const IssueStatusCard = memo(function IssueStatusCard({
    status,
}: IssueStatusCardProps) {
    return (
        <div className="bg-linear-to-br from-purple-50 to-indigo-50 rounded-lg p-4 border border-purple-200">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-2 block">
                Status
            </label>
            <div className="flex items-center gap-2">
                <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${getStatusColor(status)}`}>
                    {status.replace(/_/g, " ")}
                </span>
            </div>
        </div>
    );
});

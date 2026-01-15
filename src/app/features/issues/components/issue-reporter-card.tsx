"use client";

import { memo } from "react";
import type { User } from "@/app/core/types";

interface IssueReporterCardProps {
    readonly reporter: User | undefined;
}

export const IssueReporterCard = memo(function IssueReporterCard({
    reporter,
}: IssueReporterCardProps) {
    const initials = reporter?.name?.charAt(0).toUpperCase() || "?";

    return (
        <div className="bg-linear-to-br from-purple-50 to-indigo-50 rounded-lg p-4 border border-purple-200">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-2 block">
                Reporter
            </label>
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-purple-400 to-indigo-500 flex items-center justify-center text-white text-sm font-bold">
                    {initials}
                </div>
                <p className="text-gray-800 font-medium">{reporter?.name || "Loading..."}</p>
            </div>
        </div>
    );
});

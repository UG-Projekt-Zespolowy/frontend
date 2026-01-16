"use client";

import { memo } from "react";

interface IssueStoryPointsCardProps {
    readonly storyPoints: number | null | undefined;
}

export const IssueStoryPointsCard = memo(function IssueStoryPointsCard({
    storyPoints,
}: IssueStoryPointsCardProps) {
    if (storyPoints === null || storyPoints === undefined) {
        return null;
    }

    return (
        <div className="bg-linear-to-br from-purple-50 to-indigo-50 rounded-lg p-4 border border-purple-200">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-2 block">
                Story Points
            </label>
            <p className="text-2xl font-bold text-purple-700">{storyPoints}</p>
        </div>
    );
});

"use client";

import { memo } from "react";

interface IssueDescriptionProps {
    readonly description: string | undefined;
}

export const IssueDescription = memo(function IssueDescription({
    description,
}: IssueDescriptionProps) {
    return (
        <div>
            <label className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-2 block">
                Description
            </label>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                    {description || <span className="text-gray-400 italic">No description provided.</span>}
                </p>
            </div>
        </div>
    );
});

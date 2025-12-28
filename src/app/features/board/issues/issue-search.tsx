"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { type Issue } from "@/app/features/board/issues/types/issue.types";

interface IssueSearchProps {
    readonly issues: readonly Issue[];
}

export function IssueSearch({ issues }: IssueSearchProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const router = useRouter();

    const filteredIssues = useMemo(() => {
        if (!searchQuery.trim()) {
            return [];
        }
        const query = searchQuery.toLowerCase();
        return issues.filter((issue) =>
            issue.title.toLowerCase().includes(query)
        );
    }, [searchQuery, issues]);

    const handleIssueClick = (issueId: string) => {
        router.push(`/issues/${issueId}`);
        setSearchQuery("");
        setIsFocused(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && filteredIssues.length > 0) {
            handleIssueClick(filteredIssues[0].id);
        }
        if (e.key === "Escape") {
            setIsFocused(false);
        }
    };

    return (
        <div className="relative w-full max-w-md">
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                onKeyDown={handleKeyDown}
                placeholder="Search issues..."
                className="w-full px-4 py-3 border-2 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 bg-white/95 backdrop-blur-sm text-gray-800 shadow-lg placeholder:text-gray-400"
            />
            {isFocused && filteredIssues.length > 0 && (
                <div className="absolute z-10 w-full mt-2 bg-white/95 backdrop-blur-sm border border-white/30 rounded-xl shadow-xl max-h-60 overflow-y-auto">
                    {filteredIssues.map((issue) => (
                        <button
                            key={issue.id}
                            onClick={() => handleIssueClick(issue.id)}
                            className="w-full text-left px-4 py-3 hover:bg-linear-to-r hover:from-purple-50 hover:to-indigo-50 transition-all border-b border-purple-100 last:border-b-0"
                        >
                            <div className="font-semibold text-gray-800">
                                {issue.title}
                            </div>
                            {issue.description && (
                                <div className="text-sm text-gray-600 truncate mt-1">
                                    {issue.description}
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            )}
            {isFocused && searchQuery.trim() && filteredIssues.length === 0 && (
                <div className="absolute z-10 w-full mt-2 bg-white/95 backdrop-blur-sm border border-white/30 rounded-xl shadow-xl px-4 py-3 text-gray-400">
                    No issues found
                </div>
            )}
        </div>
    );
}

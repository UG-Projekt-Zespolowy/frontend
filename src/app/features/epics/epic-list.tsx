"use client";

import { useRouter } from "next/navigation";
import { memo } from "react";
import { LoadingState, ErrorState, EmptyState } from "@/app/core/components";
import { useProjectEpics } from "@/app/core/hooks";
import type { Epic } from "@/app/core/types";

interface EpicListProps {
    readonly projectId: string;
}

export const EpicList = memo(function EpicList({ projectId }: EpicListProps) {
    const router = useRouter();
    const { data, isLoading, error, refetch } = useProjectEpics(projectId, 0, 100);

    if (isLoading) {
        return <LoadingState message="Loading epics..." />;
    }

    if (error) {
        return (
            <ErrorState
                message="Failed to load epics. Please try again."
                onRetry={() => refetch()}
            />
        );
    }

    if (!data?.content || data.content.length === 0) {
        return <EmptyState message="No epics for this project." />;
    }

    return (
        <div className="space-y-4">
            {data.content.map((epic: Epic) => (
                <button
                    key={epic.id}
                    type="button"
                    onClick={() => router.push(`/epics/${epic.id}`)}
                    className="w-full text-left p-4 bg-white/90 rounded-xl shadow-md border border-white/40 transition-colors hover:bg-white hover:cursor-pointer"
                >
                    <h2 className="text-lg font-semibold text-gray-900">{epic.title}</h2>
                    {epic.description && (
                        <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                            {epic.description}
                        </p>
                    )}
                </button>
            ))}
        </div>
    );
});



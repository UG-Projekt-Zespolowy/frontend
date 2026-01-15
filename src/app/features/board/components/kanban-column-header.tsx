"use client";

import { memo } from "react";
import { getStatusColorByColumnId } from "@/app/features/board/utils/status.utils";

interface KanbanColumnHeaderProps {
    readonly columnId: string;
    readonly title: string;
}

export const KanbanColumnHeader = memo(function KanbanColumnHeader({
    columnId,
    title,
}: KanbanColumnHeaderProps) {
    const statusColor = getStatusColorByColumnId(columnId);

    return (
        <h2 className="text-xl font-semibold mb-4 pb-3 border-b border-purple-200">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor}`}>
                {title}
            </span>
        </h2>
    );
});


"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { IssueCard } from "@/app/features/board/issues";
import { type Issue } from "@/app/features/board/issues";
import { COLUMN_MIN_HEIGHT } from "@/app/features/board/constants/board.constants";
import { KanbanColumnHeader } from "@/app/features/board/components/kanban-column-header";
import { DropIndicator } from "@/app/features/board/components/drop-indicator";

interface SortableKanbanColumnProps {
    readonly id: string;
    readonly title: string;
    readonly issues: readonly Issue[];
}

export function SortableKanbanColumn({ id, title, issues }: SortableKanbanColumnProps) {
    const { setNodeRef, isOver } = useDroppable({ id });

    const issueIds = issues.map((issue) => issue.id);

    return (
        <div
            ref={setNodeRef}
            className={`bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-5 border border-white/30 transition-all ${isOver ? "bg-purple-50 border-purple-300 border-2" : ""
                }`}
            style={{ minHeight: `${COLUMN_MIN_HEIGHT}px` }}
        >
            <KanbanColumnHeader columnId={id} title={title} />
            <SortableContext items={issueIds} strategy={verticalListSortingStrategy}>
                <div className="space-y-3">
                    <DropIndicator isVisible={isOver && issues.length === 0} />
                    {issues.map((issue, index) => (
                        <div key={issue.id}>
                            <IssueCard issue={issue} />
                            {isOver && index === issues.length - 1 && (
                                <DropIndicator isVisible={true} />
                            )}
                        </div>
                    ))}
                    {issues.length === 0 && !isOver && (
                        <div className="text-center text-gray-400 py-8 italic">No issues</div>
                    )}
                </div>
            </SortableContext>
        </div>
    );
}


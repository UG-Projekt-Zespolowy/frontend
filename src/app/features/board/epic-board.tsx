"use client";

import { useMemo, memo, useState } from "react";
import { DndContext, DragOverlay, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableKanbanColumn } from "@/app/features/board/sortable-kanban-column";
import { IssueCreateForm } from "@/app/features/issues/issue-create-form";
import { Button } from "@/app/core/components";
import { type Issue } from "@/app/features/board/issues";
import { useEpicIssues, useUpdateIssueStatus } from "@/app/core/hooks";
import { LoadingState, ErrorState } from "@/app/core/components";
import { useEpicColumns } from "@/app/features/board/hooks/use-epic-columns";
import { useDragHandlers } from "@/app/features/board/hooks/use-drag-handlers";
import { DragOverlayIssue } from "@/app/features/board/components/drag-overlay-issue";

interface EpicBoardProps {
    readonly epicId: string;
    readonly epicTitle: string;
}

export const EpicBoard = memo(function EpicBoard({ epicId, epicTitle }: EpicBoardProps) {
    const { data: issuesData, isLoading, error, refetch } = useEpicIssues(epicId, 0, 100);
    const { mutate: updateIssueStatus } = useUpdateIssueStatus();
    const [showCreateForm, setShowCreateForm] = useState(false);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    const columns = useEpicColumns(issuesData);

    const allIssueIds = useMemo(() => {
        return columns.flatMap((col) => col.issues.map((issue) => issue.id));
    }, [columns]);

    const { activeIssue, handleDragStart, handleDragEnd } = useDragHandlers({
        columns,
        updateIssueStatus,
        refetch,
    });

    if (isLoading) {
        return <LoadingState message="Loading issues..." />;
    }

    if (error) {
        return (
            <ErrorState
                message="Failed to load issues. Please try again."
                onRetry={() => refetch()}
            />
        );
    }

    return (
        <div className="mb-8 p-6 bg-white/10 rounded-xl shadow-xl">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white drop-shadow-lg">{epicTitle}</h2>
                <Button
                    onClick={() => setShowCreateForm(!showCreateForm)}
                    variant="primary"
                >
                    {showCreateForm ? "Cancel" : "+ Add Issue"}
                </Button>
            </div>
            {showCreateForm && (
                <div className="mb-6">
                    <IssueCreateForm
                        epicId={epicId}
                        onCancel={() => setShowCreateForm(false)}
                        onSuccess={() => {
                            refetch();
                        }}
                    />
                </div>
            )}
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <SortableContext items={allIssueIds} strategy={verticalListSortingStrategy}>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                        {columns.map((column) => (
                            <SortableKanbanColumn
                                key={column.id}
                                id={column.id}
                                title={column.title}
                                issues={column.issues}
                            />
                        ))}
                    </div>
                </SortableContext>
                <DragOverlay>
                    {activeIssue ? <DragOverlayIssue issue={activeIssue} /> : null}
                </DragOverlay>
            </DndContext>
        </div>
    );
});

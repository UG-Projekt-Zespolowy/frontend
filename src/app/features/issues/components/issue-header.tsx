"use client";

import { memo } from "react";
import { Button } from "@/app/core/components";
import { getStatusColor } from "@/app/features/board/utils/status.utils";
import type { Issue } from "@/app/core/types";

interface IssueHeaderProps {
    readonly issue: Issue;
    readonly isProcessing: boolean;
    readonly onEdit: () => void;
    readonly onClose: () => void;
    readonly onOpen: () => void;
    readonly onDelete: () => void;
    readonly onBack: () => void;
    readonly isEditMode: boolean;
    readonly isOpening: boolean;
    readonly isClosing: boolean;
}

export const IssueHeader = memo(function IssueHeader({
    issue,
    isProcessing,
    onEdit,
    onClose,
    onOpen,
    onDelete,
    onBack,
    isEditMode,
    isOpening,
    isClosing,
}: IssueHeaderProps) {
    return (
        <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-bold text-white drop-shadow-lg">{issue.title}</h1>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(issue.status)}`}>
                        {issue.status.replace(/_/g, " ")}
                    </span>
                </div>
                <div className="flex gap-3">
                    <Button
                        onClick={onEdit}
                        variant="secondary"
                        disabled={isProcessing}
                    >
                        {isEditMode ? "Cancel" : "Edit"}
                    </Button>
                    {issue.status === "CLOSED" ? (
                        <Button
                            onClick={onOpen}
                            variant="secondary"
                            disabled={isProcessing}
                        >
                            {isOpening ? "Opening..." : "Open Issue"}
                        </Button>
                    ) : (
                        <Button
                            onClick={onClose}
                            variant="secondary"
                            disabled={isProcessing}
                        >
                            {isClosing ? "Closing..." : "Close Issue"}
                        </Button>
                    )}
                    <Button
                        onClick={onDelete}
                        variant="secondary"
                        disabled={isProcessing}
                        className="bg-red-600 hover:bg-red-700 text-red-600 hover:text-white"
                    >
                        Delete
                    </Button>
                    <Button onClick={onBack} variant="secondary">
                        Back
                    </Button>
                </div>
            </div>
        </div>
    );
});


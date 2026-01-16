"use client";

import { memo } from "react";
import type { Issue, User } from "@/app/core/types";
import { IssueDescription } from "@/app/features/issues/components/issue-description";
import { IssueStatusCard } from "@/app/features/issues/components/issue-status-card";
import { IssueStoryPointsCard } from "@/app/features/issues/components/issue-story-points-card";
import { IssueReporterCard } from "@/app/features/issues/components/issue-reporter-card";
import { IssueAssigneeCard } from "@/app/features/issues/components/issue-assignee-card";

interface IssueDetailsProps {
    readonly issue: Issue;
    readonly reporter: User | undefined;
    readonly assignee: User | undefined;
    readonly users: readonly User[];
    readonly isAssigneeEditing: boolean;
    readonly isAssigning: boolean;
    readonly onStartAssigneeEdit: () => void;
    readonly onAssign: (assigneeId: string) => void;
    readonly onUnassign: () => void;
    readonly onCancelAssigneeEdit: () => void;
}

export const IssueDetails = memo(function IssueDetails({
    issue,
    reporter,
    assignee,
    users,
    isAssigneeEditing,
    isAssigning,
    onStartAssigneeEdit,
    onAssign,
    onUnassign,
    onCancelAssigneeEdit,
}: IssueDetailsProps) {
    return (
        <div className="mt-6 space-y-6">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-white/30">
                <div className="space-y-6">
                    <IssueDescription description={issue.description} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <IssueStatusCard status={issue.status} />
                        <IssueStoryPointsCard storyPoints={issue.storyPoint} />
                        <IssueReporterCard reporter={reporter} />
                        <IssueAssigneeCard
                            assignee={assignee}
                            assigneeId={issue.assigneeId}
                            isEditing={isAssigneeEditing}
                            isAssigning={isAssigning}
                            users={users}
                            onStartEdit={onStartAssigneeEdit}
                            onAssign={onAssign}
                            onUnassign={onUnassign}
                            onCancelEdit={onCancelAssigneeEdit}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
});

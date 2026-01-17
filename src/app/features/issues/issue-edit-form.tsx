"use client";

import { useState, memo, FormEvent } from "react";
import { FormField, FormInput, FormTextarea, FormActions, Button } from "@/app/core/components";
import { useUsers } from "@/app/core/hooks";
import type { Issue } from "@/app/core/types";

interface IssueEditFormProps {
    readonly issue: Issue;
    readonly onCancel: () => void;
    readonly onSave: (title: string, description: string, storyPoint: number | undefined, status: string, assigneeId: string | null) => void;
    readonly isSaving: boolean;
}

const STATUS_OPTIONS = [
    { value: "BACKLOG", label: "Backlog" },
    { value: "TO_DO", label: "To Do" },
    { value: "IN_PROGRESS", label: "In Progress" },
    { value: "READY_FOR_REVIEW", label: "Ready for Review" },
    { value: "DONE", label: "Done" },
    { value: "CLOSED", label: "Closed" },
] as const;

export const IssueEditForm = memo(function IssueEditForm({
    issue,
    onCancel,
    onSave,
    isSaving,
}: IssueEditFormProps) {
    const [title, setTitle] = useState(issue.title);
    const [description, setDescription] = useState(issue.description || "");
    const [storyPoint, setStoryPoint] = useState<string>(issue.storyPoint?.toString() || "");
    const [status, setStatus] = useState(issue.status);
    const [assigneeId, setAssigneeId] = useState(issue.assigneeId || "");
    const { data: usersData } = useUsers(0, 100);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!title.trim()) {
            return;
        }

        onSave(
            title.trim(),
            description.trim(),
            storyPoint ? parseInt(storyPoint, 10) : undefined,
            status,
            assigneeId || null
        );
    };

    const canSubmit = !isSaving && !!title.trim();

    return (
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/30">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Issue</h2>

            <form key={issue.id} onSubmit={handleSubmit} className="space-y-4">
                <FormField label="Issue Title" required>
                    <FormInput
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        maxLength={200}
                        disabled={isSaving}
                        placeholder="Enter issue title"
                        autoFocus
                    />
                </FormField>

                <FormField label="Description">
                    <FormTextarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        maxLength={2000}
                        disabled={isSaving}
                        rows={4}
                        placeholder="Enter issue description (optional)"
                    />
                </FormField>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField label="Story Points">
                        <FormInput
                            id="storyPoint"
                            type="number"
                            value={storyPoint}
                            onChange={(e) => setStoryPoint(e.target.value)}
                            min="0"
                            disabled={isSaving}
                            placeholder="Enter story points (optional)"
                        />
                    </FormField>

                    <FormField label="Status" required>
                        <select
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            disabled={isSaving}
                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 bg-white text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"
                        >
                            {STATUS_OPTIONS.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </FormField>
                </div>

                <FormField label="Assignee">
                    <select
                        id="assignee"
                        value={assigneeId}
                        onChange={(e) => setAssigneeId(e.target.value)}
                        disabled={isSaving}
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 bg-white text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                        <option value="">Unassigned</option>
                        {usersData?.content.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name} ({user.username})
                            </option>
                        ))}
                    </select>
                </FormField>

                <FormActions
                    primaryAction={
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={!canSubmit}
                            className="flex-1 hover:cursor-pointer"
                        >
                            {isSaving ? "Saving..." : "Save Changes"}
                        </Button>
                    }
                    secondaryAction={
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={onCancel}
                            disabled={isSaving}
                            className="hover:bg-purple-50 hover:cursor-pointer"
                        >
                            Cancel
                        </Button>
                    }
                />
            </form>
        </div>
    );
});


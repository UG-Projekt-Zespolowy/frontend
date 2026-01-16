"use client";

import { useState, memo, FormEvent } from "react";
import { useCreateIssue, useCurrentUser } from "@/app/core/hooks";
import { Button, FormField, FormInput, FormTextarea, FormError, FormActions } from "@/app/core/components";

interface IssueCreateFormProps {
    readonly epicId: string;
    readonly onCancel?: () => void;
    readonly onSuccess?: () => void;
}

export const IssueCreateForm = memo(function IssueCreateForm({
    epicId,
    onCancel,
    onSuccess,
}: IssueCreateFormProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [storyPoint, setStoryPoint] = useState<string>("");
    const { data: currentUser, isLoading: userLoading } = useCurrentUser();
    const { mutate: createIssue, isPending, error } = useCreateIssue();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!currentUser?.id || !title.trim()) {
            return;
        }

        createIssue(
            {
                title: title.trim(),
                description: description.trim() || undefined,
                storyPoint: storyPoint ? parseInt(storyPoint, 10) : undefined,
                reporterId: currentUser.id,
                epicId,
            },
            {
                onSuccess: () => {
                    setTitle("");
                    setDescription("");
                    setStoryPoint("");
                    onSuccess?.();
                    onCancel?.();
                },
            }
        );
    };

    const isLoading = userLoading || isPending;
    const canSubmit = !isLoading && !!currentUser?.id && !!title.trim();

    return (
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/30">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create New Issue</h2>

            {error && <FormError message={error.message || "Failed to create issue. Please try again."} />}

            <form onSubmit={handleSubmit} className="space-y-4">
                <FormField label="Issue Title" required>
                    <FormInput
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        maxLength={200}
                        disabled={isLoading}
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
                        disabled={isLoading}
                        rows={4}
                        placeholder="Enter issue description (optional)"
                    />
                </FormField>

                <FormField label="Story Points">
                    <FormInput
                        id="storyPoint"
                        type="number"
                        value={storyPoint}
                        onChange={(e) => setStoryPoint(e.target.value)}
                        min="0"
                        disabled={isLoading}
                        placeholder="Enter story points (optional)"
                    />
                </FormField>

                <FormActions
                    primaryAction={
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={!canSubmit}
                            className="flex-1 hover:cursor-pointer"
                        >
                            {isPending ? "Creating..." : "Create Issue"}
                        </Button>
                    }
                    secondaryAction={
                        onCancel && (
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={onCancel}
                                disabled={isLoading}
                                className="hover:bg-purple-50 hover:cursor-pointer"
                            >
                                Cancel
                            </Button>
                        )
                    }
                />
            </form>
        </div>
    );
});


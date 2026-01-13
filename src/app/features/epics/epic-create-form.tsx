"use client";

import { useState, memo, FormEvent } from "react";
import { useCreateEpic } from "@/app/core/hooks";
import { Button, FormField, FormInput, FormTextarea, FormError, FormActions } from "@/app/core/components";

interface EpicCreateFormProps {
    readonly projectId: string;
    readonly onCancel?: () => void;
}

export const EpicCreateForm = memo(function EpicCreateForm({ projectId, onCancel }: EpicCreateFormProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const { mutate: createEpic, isPending, error } = useCreateEpic();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!title.trim()) {
            return;
        }

        createEpic(
            {
                title: title.trim(),
                description: description.trim() || undefined,
                projectId,
            },
            {
                onSuccess: () => {
                    setTitle("");
                    setDescription("");
                    onCancel?.();
                },
            }
        );
    };

    const canSubmit = !isPending && !!title.trim();

    return (
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/30">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create New Epic</h2>

            {error && <FormError message={error.message || "Failed to create epic. Please try again."} />}

            <form onSubmit={handleSubmit} className="space-y-4">
                <FormField label="Epic Title" required>
                    <FormInput
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        maxLength={200}
                        disabled={isPending}
                        placeholder="Enter epic title"
                        autoFocus
                    />
                </FormField>

                <FormField label="Description">
                    <FormTextarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        maxLength={2000}
                        disabled={isPending}
                        rows={4}
                        placeholder="Enter epic description (optional)"
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
                            {isPending ? "Creating..." : "Create Epic"}
                        </Button>
                    }
                    secondaryAction={
                        onCancel && (
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={onCancel}
                                disabled={isPending}
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

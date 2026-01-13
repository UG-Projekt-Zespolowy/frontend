"use client";

import { useState, type FormEvent, memo } from "react";
import { FormField, FormInput, FormTextarea, FormError, FormActions, Button } from "@/app/core/components";
import type { Epic } from "@/app/core/types";

interface EpicEditModalProps {
    readonly epic: Epic;
    readonly isOpen: boolean;
    readonly onClose: () => void;
    readonly onConfirm: (title: string, description: string) => void;
    readonly isUpdating: boolean;
    readonly error?: Error | null;
}

export const EpicEditModal = memo(function EpicEditModal({
    epic,
    isOpen,
    onClose,
    onConfirm,
    isUpdating,
    error,
}: EpicEditModalProps) {
    const [title, setTitle] = useState(epic.title);
    const [description, setDescription] = useState(epic.description || "");

    if (!isOpen) {
        return null;
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!title.trim()) {
            return;
        }

        onConfirm(title.trim(), description.trim());
    };

    const canSubmit = !isUpdating && !!title.trim();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Edit Epic</h2>
                <p className="text-gray-600 mb-6">Update epic details below.</p>

                {error && <FormError message={error.message || "Failed to update epic. Please try again."} />}

                <form key={epic.id} onSubmit={handleSubmit} className="space-y-4">
                    <FormField label="Epic Title" required>
                        <FormInput
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            maxLength={200}
                            disabled={isUpdating}
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
                            disabled={isUpdating}
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
                                {isUpdating ? "Updating..." : "Update Epic"}
                            </Button>
                        }
                        secondaryAction={
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={onClose}
                                disabled={isUpdating}
                                className="hover:bg-purple-50 hover:cursor-pointer"
                            >
                                Cancel
                            </Button>
                        }
                    />
                </form>
            </div>
        </div>
    );
});

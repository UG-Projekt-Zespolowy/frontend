"use client";

import { useState, type FormEvent, memo } from "react";
import { FormField, FormInput, FormTextarea, FormError, FormActions, Button } from "@/app/core/components";
import type { Project } from "@/app/core/types";

interface ProjectEditModalProps {
    readonly project: Project;
    readonly isOpen: boolean;
    readonly onClose: () => void;
    readonly onConfirm: (name: string, description: string) => void;
    readonly isUpdating: boolean;
    readonly error?: Error | null;
}

export const ProjectEditModal = memo(function ProjectEditModal({
    project,
    isOpen,
    onClose,
    onConfirm,
    isUpdating,
    error,
}: ProjectEditModalProps) {
    const [name, setName] = useState(project.name);
    const [description, setDescription] = useState(project.description || "");

    if (!isOpen) {
        return null;
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name.trim()) {
            return;
        }

        onConfirm(name.trim(), description.trim());
    };

    const canSubmit = !isUpdating && !!name.trim();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Edit Project</h2>
                <p className="text-gray-600 mb-6">Update project details below.</p>

                {error && <FormError message={error.message || "Failed to update project. Please try again."} />}

                <form key={project.id} onSubmit={handleSubmit} className="space-y-4">
                    <FormField label="Project Name" required>
                        <FormInput
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            maxLength={100}
                            disabled={isUpdating}
                            placeholder="Enter project name"
                            autoFocus
                        />
                    </FormField>

                    <FormField label="Description">
                        <FormTextarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            maxLength={1000}
                            disabled={isUpdating}
                            rows={4}
                            placeholder="Enter project description (optional)"
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
                                {isUpdating ? "Updating..." : "Update Project"}
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


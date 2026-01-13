"use client";

import { useState, memo, FormEvent } from "react";
import { useCreateProject, useCurrentUser } from "@/app/core/hooks";
import { Button, FormField, FormInput, FormTextarea, FormError, FormActions } from "@/app/core/components";

interface ProjectCreateFormProps {
    readonly onCancel?: () => void;
}

export const ProjectCreateForm = memo(function ProjectCreateForm({ onCancel }: ProjectCreateFormProps) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const { data: currentUser, isLoading: userLoading } = useCurrentUser();
    const { mutate: createProject, isPending, error } = useCreateProject();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!currentUser?.id || !name.trim()) {
            return;
        }

        createProject({
            name: name.trim(),
            description: description.trim() || undefined,
            ownerId: currentUser.id,
        });
    };

    const isLoading = userLoading || isPending;
    const canSubmit = !isLoading && !!currentUser?.id && !!name.trim();

    return (
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/30">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create New Project</h2>

            {error && <FormError message={error.message || "Failed to create project. Please try again."} />}

            <form onSubmit={handleSubmit} className="space-y-4">
                <FormField label="Project Name" required>
                    <FormInput
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        maxLength={100}
                        disabled={isLoading}
                        placeholder="Enter project name"
                    />
                </FormField>

                <FormField label="Description">
                    <FormTextarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        maxLength={1000}
                        disabled={isLoading}
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
                            className="flex-1"
                        >
                            {isPending ? "Creating..." : "Create Project"}
                        </Button>
                    }
                    secondaryAction={
                        onCancel && (
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={onCancel}
                                disabled={isLoading}
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


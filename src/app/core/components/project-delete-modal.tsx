"use client";

import { useState, type FormEvent, memo } from "react";
import { FormField, FormInput, FormError, FormActions, Button } from "@/app/core/components";
import type { Project } from "@/app/core/types";

interface ProjectDeleteModalProps {
    readonly project: Project;
    readonly isOpen: boolean;
    readonly onClose: () => void;
    readonly onConfirm: () => void;
    readonly isDeleting: boolean;
    readonly error?: Error | null;
}

export const ProjectDeleteModal = memo(function ProjectDeleteModal({
    project,
    isOpen,
    onClose,
    onConfirm,
    isDeleting,
    error,
}: ProjectDeleteModalProps) {
    const [confirmationName, setConfirmationName] = useState("");

    if (!isOpen) {
        return null;
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (confirmationName.trim() === project.name) {
            onConfirm();
            setConfirmationName("");
        }
    };

    const isConfirmed = confirmationName.trim() === project.name;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Delete Project</h2>
                <p className="text-gray-600 mb-6">
                    Are you sure you want to delete this project? This action cannot be undone.
                </p>

                {error && <FormError message={error.message || "Failed to delete project. Please try again."} />}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <FormField
                        label={`Type "${project.name}" to confirm`}
                        required
                    >
                        <FormInput
                            type="text"
                            value={confirmationName}
                            onChange={(e) => setConfirmationName(e.target.value)}
                            disabled={isDeleting}
                            placeholder={project.name}
                            autoFocus
                        />
                    </FormField>

                    <FormActions
                        primaryAction={
                            <Button
                                type="submit"
                                variant="primary"
                                disabled={!isConfirmed || isDeleting}
                                className="bg-red-600 hover:bg-red-700 text-red-600 hover:text-white hover:cursor-pointer flex-1"
                            >
                                {isDeleting ? "Deleting..." : "Delete Project"}
                            </Button>
                        }
                        secondaryAction={
                            <Button
                                type="button"
                                variant="secondary"
                                className="hover:cursor-pointer"
                                onClick={() => {
                                    onClose();
                                    setConfirmationName("");
                                }}
                                disabled={isDeleting}
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


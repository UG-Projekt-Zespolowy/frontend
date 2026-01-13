"use client";

import { useState, type FormEvent, memo } from "react";
import { FormField, FormInput, FormError, FormActions, Button } from "@/app/core/components";
import type { Epic } from "@/app/core/types";

interface EpicDeleteModalProps {
    readonly epic: Epic;
    readonly isOpen: boolean;
    readonly onClose: () => void;
    readonly onConfirm: () => void;
    readonly isDeleting: boolean;
    readonly error?: Error | null;
}

export const EpicDeleteModal = memo(function EpicDeleteModal({
    epic,
    isOpen,
    onClose,
    onConfirm,
    isDeleting,
    error,
}: EpicDeleteModalProps) {
    const [confirmationTitle, setConfirmationTitle] = useState("");

    if (!isOpen) {
        return null;
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (confirmationTitle.trim() === epic.title) {
            onConfirm();
            setConfirmationTitle("");
        }
    };

    const isConfirmed = confirmationTitle.trim() === epic.title;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Delete Epic</h2>
                <p className="text-gray-600 mb-6">
                    Are you sure you want to delete this epic? This action cannot be undone.
                </p>

                {error && <FormError message={error.message || "Failed to delete epic. Please try again."} />}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <FormField label={`Type "${epic.title}" to confirm`} required>
                        <FormInput
                            type="text"
                            value={confirmationTitle}
                            onChange={(e) => setConfirmationTitle(e.target.value)}
                            disabled={isDeleting}
                            placeholder={epic.title}
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
                                {isDeleting ? "Deleting..." : "Delete Epic"}
                            </Button>
                        }
                        secondaryAction={
                            <Button
                                type="button"
                                variant="secondary"
                                className="hover:bg-purple-50 hover:cursor-pointer"
                                onClick={() => {
                                    onClose();
                                    setConfirmationTitle("");
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

"use client";

import { useState, type FormEvent, memo } from "react";
import { FormField, FormInput, FormError, FormActions, Button } from "@/app/core/components";
import type { Issue } from "@/app/core/types";

interface IssueDeleteModalProps {
    readonly issue: Issue;
    readonly isOpen: boolean;
    readonly onClose: () => void;
    readonly onConfirm: () => void;
    readonly isDeleting: boolean;
    readonly error?: Error | null;
}

export const IssueDeleteModal = memo(function IssueDeleteModal({
    issue,
    isOpen,
    onClose,
    onConfirm,
    isDeleting,
    error,
}: IssueDeleteModalProps) {
    const [confirmationName, setConfirmationName] = useState("");

    if (!isOpen) {
        return null;
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (confirmationName.trim() === issue.title) {
            onConfirm();
            setConfirmationName("");
        }
    };

    const isConfirmed = confirmationName.trim() === issue.title;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Delete Issue</h2>
                <p className="text-gray-600 mb-6">
                    Are you sure you want to delete this issue? This action cannot be undone.
                </p>

                {error && <FormError message={error.message || "Failed to delete issue. Please try again."} />}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <FormField
                        label={`Type "${issue.title}" to confirm`}
                        required
                    >
                        <FormInput
                            type="text"
                            value={confirmationName}
                            onChange={(e) => setConfirmationName(e.target.value)}
                            disabled={isDeleting}
                            placeholder={issue.title}
                            autoFocus
                        />
                    </FormField>

                    <FormActions
                        primaryAction={
                            <Button
                                type="submit"
                                variant="primary"
                                disabled={!isConfirmed || isDeleting}
                                className="bg-red-600 hover:bg-red-700 text-red-600 hover:text-white flex-1"
                            >
                                {isDeleting ? "Deleting..." : "Delete Issue"}
                            </Button>
                        }
                        secondaryAction={
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => {
                                    onClose();
                                    setConfirmationName("");
                                }}
                                disabled={isDeleting}
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


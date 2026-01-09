"use client";

import { useState, type FormEvent } from "react";

interface UserEditModalProps {
    readonly name: string;
    readonly email?: string;
    readonly isOpen: boolean;
    readonly onClose: () => void;
    readonly onConfirm: (name: string, email: string) => void;
    readonly isUpdating: boolean;
    readonly error?: Error | null;
}

export function UserEditModal({
    name: initialName,
    email: initialEmail,
    isOpen,
    onClose,
    onConfirm,
    isUpdating,
    error,
}: UserEditModalProps) {
    const [name, setName] = useState(initialName);
    const [email, setEmail] = useState(initialEmail || "");

    if (!isOpen) {
        return null;
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name.trim()) {
            return;
        }

        onConfirm(name.trim(), email.trim());
    };

    const canSubmit = !isUpdating && !!name.trim();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Edit Profile</h2>
                <p className="text-gray-600 mb-6">Update your profile details below.</p>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-600">
                            {error.message || "Failed to update profile. Please try again."}
                        </p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            maxLength={200}
                            disabled={isUpdating}
                            placeholder="Enter your name"
                            autoFocus
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-900"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            maxLength={200}
                            disabled={isUpdating}
                            placeholder="Enter your email (optional)"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-900"
                        />
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="submit"
                            disabled={!canSubmit}
                            className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
                        >
                            {isUpdating ? "Updating..." : "Update Profile"}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isUpdating}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:cursor-not-allowed font-medium"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

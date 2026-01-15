"use client";

import { memo } from "react";
import type { User } from "@/app/core/types";

interface IssueAssigneeCardProps {
    readonly assignee: User | undefined;
    readonly assigneeId: string | undefined;
    readonly isEditing: boolean;
    readonly isAssigning: boolean;
    readonly users: readonly User[];
    readonly onStartEdit: () => void;
    readonly onAssign: (assigneeId: string) => void;
    readonly onUnassign: () => void;
    readonly onCancelEdit: () => void;
}

export const IssueAssigneeCard = memo(function IssueAssigneeCard({
    assignee,
    assigneeId,
    isEditing,
    isAssigning,
    users,
    onStartEdit,
    onAssign,
    onUnassign,
    onCancelEdit,
}: IssueAssigneeCardProps) {
    if (isEditing) {
        return (
            <div className="bg-linear-to-br from-purple-50 to-indigo-50 rounded-lg p-4 border border-purple-200 relative">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-2 block">
                    Assignee
                </label>
                <div className="space-y-2">
                    <select
                        value={assigneeId || ""}
                        onChange={(e) => {
                            if (e.target.value) {
                                onAssign(e.target.value);
                            } else {
                                onUnassign();
                            }
                        }}
                        disabled={isAssigning}
                        className="w-full px-3 py-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 bg-white text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"
                        autoFocus
                        onBlur={() => setTimeout(onCancelEdit, 200)}
                    >
                        <option value="">Unassigned</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name} ({user.username})
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        );
    }

    const initials = assignee?.name?.charAt(0).toUpperCase() || "?";

    return (
        <div className="bg-linear-to-br from-purple-50 to-indigo-50 rounded-lg p-4 border border-purple-200 relative">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-2 block">
                Assignee
            </label>
            <div
                onClick={onStartEdit}
                className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity group"
            >
                {assignee ? (
                    <>
                        <div className="w-8 h-8 rounded-full bg-linear-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                            {initials}
                        </div>
                        <p className="text-gray-800 font-medium group-hover:text-purple-700 transition-colors">
                            {assignee.name}
                        </p>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-4 h-4 text-gray-400 group-hover:text-purple-600 ml-auto"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                        </svg>
                    </>
                ) : (
                    <>
                        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-sm font-bold">
                            ?
                        </div>
                        <p className="text-gray-500 italic group-hover:text-purple-700 transition-colors">
                            Unassigned
                        </p>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-4 h-4 text-gray-400 group-hover:text-purple-600 ml-auto"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4.5v15m7.5-7.5h-15"
                            />
                        </svg>
                    </>
                )}
            </div>
        </div>
    );
});

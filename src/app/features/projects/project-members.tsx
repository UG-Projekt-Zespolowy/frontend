"use client";

import { useState, memo } from "react";
import { LoadingState, ErrorState, EmptyState, Button } from "@/app/core/components";
import {
    useProjectMembers,
    useAddUserToProject,
    useRemoveUserFromProject,
    useUsers,
    useUser,
    useIsUserOwner,
} from "@/app/core/hooks";
import type { UserProject, ProjectRole } from "@/app/core/types";

interface ProjectMembersProps {
    readonly projectId: string;
}

const ROLE_OPTIONS: { value: ProjectRole; label: string }[] = [
    { value: "PROJECT_MANAGER", label: "Project Manager" },
    { value: "MEMBER", label: "Member" },
];

export const ProjectMembers = memo(function ProjectMembers({ projectId }: ProjectMembersProps) {
    const { data: membersData, isLoading, error, refetch } = useProjectMembers(projectId, 0, 100);
    const { data: usersData } = useUsers(0, 100);
    const { data: isOwner } = useIsUserOwner(projectId);
    const { mutate: addUser, isPending: isAdding } = useAddUserToProject();
    const { mutate: removeUser, isPending: isRemoving } = useRemoveUserFromProject();
    const [showAddForm, setShowAddForm] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState("");
    const [selectedRole, setSelectedRole] = useState<ProjectRole>("MEMBER");

    const handleAddUser = () => {
        if (!selectedUserId) {
            return;
        }

        addUser(
            {
                projectId,
                userId: selectedUserId,
                role: selectedRole,
            },
            {
                onSuccess: () => {
                    setShowAddForm(false);
                    setSelectedUserId("");
                    setSelectedRole("MEMBER");
                },
            }
        );
    };

    const handleRemoveUser = (userId: string) => {
        if (!confirm("Are you sure you want to remove this member from the project?")) {
            return;
        }

        removeUser(
            {
                projectId,
                userId,
            },
            {
                onSuccess: () => {
                    refetch();
                },
            }
        );
    };

    if (isLoading) {
        return <LoadingState message="Loading members..." />;
    }

    if (error) {
        return (
            <ErrorState
                message="Failed to load project members. Please try again."
                onRetry={() => refetch()}
            />
        );
    }

    const members = membersData?.content || [];
    const memberUserIds = new Set(members.map((m) => m.userId));
    const availableUsers = usersData?.content.filter((user) => !memberUserIds.has(user.id)) || [];

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-white">Project Members</h2>
                {isOwner && (
                    <Button
                        onClick={() => setShowAddForm(!showAddForm)}
                        variant="primary"
                        disabled={isAdding || isRemoving}
                    >
                        {showAddForm ? "Cancel" : "+ Add Member"}
                    </Button>
                )}
            </div>

            {showAddForm && isOwner && (
                <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/30">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Add Member</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                User
                            </label>
                            <select
                                value={selectedUserId}
                                onChange={(e) => setSelectedUserId(e.target.value)}
                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 bg-white text-gray-900"
                            >
                                <option value="">Select a user</option>
                                {availableUsers.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.name} ({user.username})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Role
                            </label>
                            <select
                                value={selectedRole}
                                onChange={(e) => setSelectedRole(e.target.value as ProjectRole)}
                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 bg-white text-gray-900"
                            >
                                {ROLE_OPTIONS.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                onClick={handleAddUser}
                                variant="primary"
                                disabled={!selectedUserId || isAdding}
                                className="flex-1"
                            >
                                {isAdding ? "Adding..." : "Add Member"}
                            </Button>
                            <Button
                                onClick={() => {
                                    setShowAddForm(false);
                                    setSelectedUserId("");
                                }}
                                variant="secondary"
                                disabled={isAdding}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {members.length === 0 ? (
                <EmptyState message="No members in this project." />
            ) : (
                <div className="space-y-2">
                    {members.map((member) => (
                        <MemberItem
                            key={member.id}
                            member={member}
                            onRemove={isOwner && !member.isOwner ? handleRemoveUser : undefined}
                            isRemoving={isRemoving}
                        />
                    ))}
                </div>
            )}
        </div>
    );
});

interface MemberItemProps {
    readonly member: UserProject;
    readonly onRemove?: (userId: string) => void;
    readonly isRemoving: boolean;
}

function MemberItem({ member, onRemove, isRemoving }: MemberItemProps) {
    const { data: user } = useUser(member.userId);

    return (
        <div className="bg-white/90 rounded-xl shadow-md border border-white/40 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                    {user?.name?.charAt(0).toUpperCase() || "?"}
                </div>
                <div>
                    <p className="text-gray-900 font-medium">{user?.name || "Loading..."}</p>
                    <p className="text-sm text-gray-600">
                        {user?.username || ""} • {member.role === "PROJECT_MANAGER" ? "Project Manager" : "Member"}
                        {member.isOwner && " • Owner"}
                    </p>
                </div>
            </div>
            {onRemove && (
                <button
                    type="button"
                    onClick={() => onRemove(member.userId)}
                    disabled={isRemoving}
                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Remove member"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            )}
        </div>
    );
}

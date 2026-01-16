"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithAuth } from "@/app/core/api/api-client";
import { useCurrentUser } from "@/app/core/hooks/use-users";
import type { UserProject, PageResponse, ProjectRole } from "@/app/core/types";

export function useProjectMembers(projectId: string, page: number = 0, size: number = 100) {
    return useQuery<PageResponse<UserProject>>({
        queryKey: ["user-projects", "project", projectId, page, size],
        queryFn: async () => {
            const response = await fetchWithAuth(
                `/api/v1/user-projects/projects/${projectId}/users?page=${page}&size=${size}`
            );
            if (!response.ok) {
                throw new Error("Failed to fetch project members");
            }
            return response.json();
        },
        enabled: !!projectId,
    });
}

export function useUserProjects(userId: string, page: number = 0, size: number = 100) {
    return useQuery<PageResponse<UserProject>>({
        queryKey: ["user-projects", "user", userId, page, size],
        queryFn: async () => {
            const response = await fetchWithAuth(
                `/api/v1/user-projects/users/${userId}/projects?page=${page}&size=${size}`
            );
            if (!response.ok) {
                throw new Error("Failed to fetch user projects");
            }
            return response.json();
        },
        enabled: !!userId,
    });
}

export function useIsUserInProject(projectId: string) {
    const { data: currentUser } = useCurrentUser();

    return useQuery<boolean>({
        queryKey: ["user-projects", "is-member", projectId, currentUser?.id],
        queryFn: async () => {
            if (!currentUser?.id || !projectId) {
                return false;
            }
            const response = await fetchWithAuth(
                `/api/v1/user-projects/projects/${projectId}/users/${currentUser.id}/is-member`
            );
            if (!response.ok) {
                return false;
            }
            return response.json();
        },
        enabled: !!currentUser?.id && !!projectId,
    });
}

export function useIsUserOwner(projectId: string) {
    const { data: currentUser } = useCurrentUser();

    return useQuery<boolean>({
        queryKey: ["user-projects", "is-owner", projectId, currentUser?.id],
        queryFn: async () => {
            if (!currentUser?.id || !projectId) {
                return false;
            }
            const response = await fetchWithAuth(
                `/api/v1/user-projects/projects/${projectId}/users/${currentUser.id}/is-owner`
            );
            if (!response.ok) {
                return false;
            }
            return response.json();
        },
        enabled: !!currentUser?.id && !!projectId,
    });
}

interface AddUserToProjectRequest {
    readonly projectId: string;
    readonly userId: string;
    readonly role: ProjectRole;
}

export function useAddUserToProject() {
    const queryClient = useQueryClient();

    return useMutation<UserProject, Error, AddUserToProjectRequest>({
        mutationFn: async (request) => {
            const response = await fetchWithAuth(
                `/api/v1/user-projects/projects/${request.projectId}/users`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        userId: request.userId,
                        role: request.role,
                    }),
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to add user to project: ${response.status} ${errorText}`);
            }

            return response.json();
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["user-projects", "project", data.projectId] });
            queryClient.invalidateQueries({ queryKey: ["projects", "user"] });
        },
    });
}

interface RemoveUserFromProjectRequest {
    readonly projectId: string;
    readonly userId: string;
}

export function useRemoveUserFromProject() {
    const queryClient = useQueryClient();

    return useMutation<void, Error, RemoveUserFromProjectRequest>({
        mutationFn: async (request) => {
            const response = await fetchWithAuth(
                `/api/v1/user-projects/projects/${request.projectId}/users/${request.userId}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to remove user from project: ${response.status} ${errorText}`);
            }
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["user-projects", "project", variables.projectId] });
            queryClient.invalidateQueries({ queryKey: ["projects", "user"] });
        },
    });
}
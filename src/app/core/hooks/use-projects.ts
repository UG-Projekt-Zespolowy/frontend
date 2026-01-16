"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { fetchWithAuth } from "@/app/core/api/api-client";
import { useCurrentUser } from "@/app/core/hooks/use-users";
import type { Project, PageResponse } from "@/app/core/types";

export function useProjects(page: number = 0, size: number = 100) {
    const { data: currentUser, isLoading: isLoadingUser } = useCurrentUser();

    return useQuery<PageResponse<Project>>({
        queryKey: ["projects", "user", currentUser?.id, page, size],
        queryFn: async () => {
            if (!currentUser?.id) {
                throw new Error("User not authenticated");
            }
            const response = await fetchWithAuth(`/api/v1/projects/user/${currentUser.id}?page=${page}&size=${size}`);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to fetch projects: ${response.status} ${errorText}`);
            }
            return response.json();
        },
        enabled: !!currentUser?.id && !isLoadingUser,
    });
}

export function useProject(id: string) {
    return useQuery<Project>({
        queryKey: ["project", id],
        queryFn: async () => {
            const response = await fetchWithAuth(`/api/v1/projects/${id}`);
            if (!response.ok) {
                throw new Error("Failed to fetch project");
            }
            return response.json();
        },
        enabled: !!id,
    });
}

interface CreateProjectRequest {
    readonly name: string;
    readonly description?: string;
    readonly ownerId: string;
}

export function useCreateProject() {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation<Project, Error, CreateProjectRequest>({
        mutationFn: async (request) => {
            const response = await fetchWithAuth("/api/v1/projects", {
                method: "POST",
                body: JSON.stringify({
                    name: request.name,
                    description: request.description || "",
                    ownerId: request.ownerId,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to create project: ${response.status} ${errorText}`);
            }

            return response.json();
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            router.push(`/projects/${data.id}/epics`);
        },
    });
}

interface UpdateProjectRequest {
    readonly projectId: string;
    readonly name: string;
    readonly description?: string;
}

export function useUpdateProject() {
    const queryClient = useQueryClient();

    return useMutation<Project, Error, UpdateProjectRequest>({
        mutationFn: async (request) => {
            const response = await fetchWithAuth(`/api/v1/projects/${request.projectId}`, {
                method: "PUT",
                body: JSON.stringify({
                    name: request.name,
                    description: request.description || "",
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to update project: ${response.status} ${errorText}`);
            }

            return response.json();
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            queryClient.invalidateQueries({ queryKey: ["project", data.id] });
        },
    });
}

export function useDeleteProject() {
    const queryClient = useQueryClient();

    return useMutation<void, Error, string>({
        mutationFn: async (projectId) => {
            const response = await fetchWithAuth(`/api/v1/projects/${projectId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to delete project: ${response.status} ${errorText}`);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
    });
}

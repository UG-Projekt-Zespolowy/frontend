"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithAuth } from "@/app/core/api/api-client";
import type { Epic, PageResponse } from "@/app/core/types";

export function useProjectEpics(projectId: string, page: number = 0, size: number = 100) {
    return useQuery<PageResponse<Epic>>({
        queryKey: ["epics", "project", projectId, page, size],
        queryFn: async () => {
            const response = await fetchWithAuth(
                `/api/v1/epics/project/${projectId}?page=${page}&size=${size}`
            );
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to fetch project epics: ${response.status} ${errorText}`);
            }
            return response.json();
        },
        enabled: !!projectId,
    });
}

export function useEpic(id: string) {
    return useQuery<Epic>({
        queryKey: ["epic", id],
        queryFn: async () => {
            const response = await fetchWithAuth(`/api/v1/epics/${id}`);
            if (!response.ok) {
                throw new Error("Failed to fetch epic");
            }
            return response.json();
        },
        enabled: !!id,
    });
}

interface CreateEpicRequest {
    readonly title: string;
    readonly description?: string;
    readonly projectId: string;
}

export function useCreateEpic() {
    const queryClient = useQueryClient();

    return useMutation<Epic, Error, CreateEpicRequest>({
        mutationFn: async (request) => {
            const response = await fetchWithAuth("/api/v1/epics", {
                method: "POST",
                body: JSON.stringify({
                    title: request.title,
                    description: request.description || "",
                    projectId: request.projectId,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to create epic: ${response.status} ${errorText}`);
            }

            return response.json();
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["epics", "project", data.projectId] });
            queryClient.invalidateQueries({ queryKey: ["epics"] });
        },
    });
}

interface UpdateEpicRequest {
    readonly epicId: string;
    readonly title: string;
    readonly description?: string;
}

export function useUpdateEpic() {
    const queryClient = useQueryClient();

    return useMutation<Epic, Error, UpdateEpicRequest>({
        mutationFn: async (request) => {
            const response = await fetchWithAuth(`/api/v1/epics/${request.epicId}`, {
                method: "PUT",
                body: JSON.stringify({
                    title: request.title,
                    description: request.description || "",
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to update epic: ${response.status} ${errorText}`);
            }

            return response.json();
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["epic", data.id] });
            queryClient.invalidateQueries({ queryKey: ["epics", "project", data.projectId] });
            queryClient.invalidateQueries({ queryKey: ["epics"] });
        },
    });
}

export function useDeleteEpic() {
    const queryClient = useQueryClient();

    return useMutation<void, Error, { epicId: string; projectId: string }>({
        mutationFn: async ({ epicId }) => {
            const response = await fetchWithAuth(`/api/v1/epics/${epicId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to delete epic: ${response.status} ${errorText}`);
            }
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["epics", "project", variables.projectId] });
            queryClient.invalidateQueries({ queryKey: ["epics"] });
        },
    });
}

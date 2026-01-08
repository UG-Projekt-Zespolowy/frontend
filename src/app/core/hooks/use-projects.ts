"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { fetchWithAuth } from "@/app/core/api/api-client";
import type { Project, PageResponse } from "@/app/core/types";

export function useProjects(page: number = 0, size: number = 100) {
    return useQuery<PageResponse<Project>>({
        queryKey: ["projects", page, size],
        queryFn: async () => {
            const response = await fetchWithAuth(`/api/v1/projects?page=${page}&size=${size}`);
            if (!response.ok) {
                throw new Error("Failed to fetch projects");
            }
            return response.json();
        },
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

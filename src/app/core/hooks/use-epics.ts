"use client";

import { useQuery } from "@tanstack/react-query";
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

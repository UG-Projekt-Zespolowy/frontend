"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchWithAuth } from "@/app/core/api/api-client";
import type { Issue, PageResponse } from "@/app/core/types";

export function useEpicIssues(epicId: string, page: number = 0, size: number = 100) {
    return useQuery<PageResponse<Issue>>({
        queryKey: ["issues", "epic", epicId, page, size],
        queryFn: async () => {
            const response = await fetchWithAuth(
                `/api/v1/issues/epic/${epicId}?page=${page}&size=${size}`
            );
            if (!response.ok) {
                throw new Error("Failed to fetch epic issues");
            }
            return response.json();
        },
        enabled: !!epicId,
    });
}

export function useProjectIssues(projectId: string, page: number = 0, size: number = 100) {
    return useQuery<PageResponse<Issue>>({
        queryKey: ["issues", "project", projectId, page, size],
        queryFn: async () => {
            const response = await fetchWithAuth(
                `/api/v1/issues/project/${projectId}?page=${page}&size=${size}`
            );
            if (!response.ok) {
                throw new Error("Failed to fetch project issues");
            }
            return response.json();
        },
        enabled: !!projectId,
    });
}

export function useBacklogIssues(projectId: string, page: number = 0, size: number = 100) {
    return useQuery<PageResponse<Issue>>({
        queryKey: ["issues", "backlog", projectId, page, size],
        queryFn: async () => {
            const response = await fetchWithAuth(
                `/api/v1/issues/project/${projectId}?status=BACKLOG&page=${page}&size=${size}`
            );
            if (!response.ok) {
                throw new Error("Failed to fetch backlog issues");
            }
            return response.json();
        },
        enabled: !!projectId,
    });
}


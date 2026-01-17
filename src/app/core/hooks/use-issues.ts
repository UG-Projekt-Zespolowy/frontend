"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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

            const data = (await response.json()) as PageResponse<Issue>;

            const activeIssues = data.content.filter((issue) => issue.status !== "BACKLOG");

            return {
                ...data,
                content: activeIssues,
            };
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

export function useBacklogIssues(epicId: string, page: number = 0, size: number = 100) {
    return useQuery<PageResponse<Issue>>({
        queryKey: ["issues", "backlog", epicId, page, size],
        queryFn: async () => {
            const response = await fetchWithAuth(
                `/api/v1/issues/epic/${epicId}?page=${page}&size=${size}`
            );
            if (!response.ok) {
                throw new Error("Failed to fetch backlog issues");
            }
            const data = (await response.json()) as PageResponse<Issue>;

            const backlogIssues = data.content.filter((issue) => issue.status === "BACKLOG");

            return {
                ...data,
                content: backlogIssues,
            };
        },
        enabled: !!epicId,
    });
}

interface CreateIssueRequest {
    readonly title: string;
    readonly description?: string;
    readonly storyPoint?: number;
    readonly reporterId: string;
    readonly assigneeId?: string;
    readonly epicId: string;
}

export function useCreateIssue() {
    const queryClient = useQueryClient();

    return useMutation<Issue, Error, CreateIssueRequest>({
        mutationFn: async (request) => {
            const response = await fetchWithAuth("/api/v1/issues", {
                method: "POST",
                body: JSON.stringify({
                    title: request.title,
                    description: request.description || "",
                    storyPoint: request.storyPoint || null,
                    reporterId: request.reporterId,
                    assigneeId: request.assigneeId || null,
                    epicId: request.epicId,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to create issue: ${response.status} ${errorText}`);
            }

            return response.json();
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["issues", "epic", data.epicId] });
            queryClient.invalidateQueries({ queryKey: ["issues"] });
        },
    });
}

export function useIssue(issueId: string) {
    return useQuery<Issue>({
        queryKey: ["issue", issueId],
        queryFn: async () => {
            const response = await fetchWithAuth(`/api/v1/issues/${issueId}`);
            if (!response.ok) {
                throw new Error("Failed to fetch issue");
            }
            return response.json();
        },
        enabled: !!issueId,
    });
}

interface UpdateIssueRequest {
    readonly title: string;
    readonly description?: string;
    readonly storyPoint?: number;
    readonly status: string;
    readonly assigneeId?: string;
}

export function useUpdateIssue() {
    const queryClient = useQueryClient();

    return useMutation<Issue, Error, { issueId: string; request: UpdateIssueRequest }>({
        mutationFn: async ({ issueId, request }) => {
            const response = await fetchWithAuth(`/api/v1/issues/${issueId}`, {
                method: "PUT",
                body: JSON.stringify({
                    title: request.title,
                    description: request.description || "",
                    storyPoint: request.storyPoint || null,
                    status: request.status,
                    assigneeId: request.assigneeId || null,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to update issue: ${response.status} ${errorText}`);
            }

            return response.json();
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["issue", data.id] });
            queryClient.invalidateQueries({ queryKey: ["issues"] });
            if (data.epicId) {
                queryClient.invalidateQueries({ queryKey: ["issues", "epic", data.epicId] });
            }
        },
    });
}

export function useAssignIssue() {
    const queryClient = useQueryClient();

    return useMutation<Issue, Error, { issueId: string; assigneeId: string }>({
        mutationFn: async ({ issueId, assigneeId }) => {
            const response = await fetchWithAuth(`/api/v1/issues/${issueId}/assign`, {
                method: "PATCH",
                body: JSON.stringify({ assigneeId }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to assign issue: ${response.status} ${errorText}`);
            }

            return response.json();
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["issue", data.id] });
            queryClient.invalidateQueries({ queryKey: ["issues"] });
            if (data.epicId) {
                queryClient.invalidateQueries({ queryKey: ["issues", "epic", data.epicId] });
            }
        },
    });
}

export function useDeleteIssue() {
    const queryClient = useQueryClient();

    return useMutation<void, Error, { issueId: string }>({
        mutationFn: async ({ issueId }) => {
            const response = await fetchWithAuth(`/api/v1/issues/${issueId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to delete issue: ${response.status} ${errorText}`);
            }
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["issues"] });
            queryClient.removeQueries({ queryKey: ["issue", variables.issueId] });
        },
    });
}

export function useUpdateIssueStatus() {
    const queryClient = useQueryClient();

    return useMutation<Issue, Error, { issueId: string; status: string }>({
        mutationFn: async ({ issueId, status }) => {
            const response = await fetchWithAuth(`/api/v1/issues/${issueId}/status`, {
                method: "PATCH",
                body: JSON.stringify({ status }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to update issue status: ${response.status} ${errorText}`);
            }

            return response.json();
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["issue", data.id] });
            queryClient.invalidateQueries({ queryKey: ["issues"] });
            if (data.epicId) {
                queryClient.invalidateQueries({ queryKey: ["issues", "epic", data.epicId] });
            }
        },
    });
}

export function useCloseIssue() {
    return useUpdateIssueStatus();
}

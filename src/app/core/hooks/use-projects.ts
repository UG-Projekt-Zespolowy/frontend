"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchWithAuth } from "@/app/core/api/api-client";
import type { Project } from "@/app/core/types";

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

"use client";

import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithAuth } from "@/app/core/api/api-client";
import type { User, PageResponse } from "@/app/core/types";

interface UseUsersState {
    data: PageResponse<User> | null;
    loading: boolean;
    error: Error | null;
}

export function useUser(id: string) {
    const [state, setState] = useState<{ data: User | null; loading: boolean; error: Error | null }>({
        data: null,
        loading: true,
        error: null,
    });

    useEffect(() => {
        if (!id) {
            setState({ data: null, loading: false, error: null });
            return;
        }

        const fetchUser = async () => {
            try {
                setState((prev) => ({ ...prev, loading: true, error: null }));
                const response = await fetchWithAuth(`/api/v1/users/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch user");
                }
                const data = await response.json();
                setState({ data, loading: false, error: null });
            } catch (error) {
                setState({
                    data: null,
                    loading: false,
                    error: error instanceof Error ? error : new Error("Unknown error"),
                });
            }
        };

        fetchUser();
    }, [id]);

    return state;
}

export function useUserByEmail(email: string) {
    const [state, setState] = useState<{ data: User | null; loading: boolean; error: Error | null }>({
        data: null,
        loading: true,
        error: null,
    });

    useEffect(() => {
        if (!email) {
            setState({ data: null, loading: false, error: null });
            return;
        }

        const fetchUserByEmail = async () => {
            try {
                setState((prev) => ({ ...prev, loading: true, error: null }));
                const response = await fetchWithAuth(`/api/v1/users/username/${email}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch user");
                }
                const data = await response.json();
                setState({ data, loading: false, error: null });
            } catch (error) {
                setState({
                    data: null,
                    loading: false,
                    error: error instanceof Error ? error : new Error("Unknown error"),
                });
            }
        };

        fetchUserByEmail();
    }, [email]);

    return state;
}

interface UpdateUserRequest {
    readonly userId: string;
    readonly name: string;
    readonly email?: string;
}

export function useUpdateUser() {
    const queryClient = useQueryClient();

    return useMutation<User, Error, UpdateUserRequest>({
        mutationFn: async (request) => {
            const response = await fetchWithAuth(`/api/v1/users/${request.userId}`, {
                method: "PUT",
                body: JSON.stringify({
                    name: request.name,
                    username: request.email, // Backend expects "username" field but it stores email
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to update user: ${response.status} ${errorText}`);
            }

            return response.json();
        },
        onSuccess: (data) => {
            // Invalidate and refetch user queries to update the UI
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
    });
}

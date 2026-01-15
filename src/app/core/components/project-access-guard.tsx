"use client";

import { useParams, useRouter } from "next/navigation";
import { LoadingState, ErrorState } from "@/app/core/components";
import { useIsUserInProject } from "@/app/core/hooks";

interface ProjectAccessGuardProps {
    readonly children: React.ReactNode;
}

export function ProjectAccessGuard({ children }: ProjectAccessGuardProps) {
    const params = useParams();
    const router = useRouter();
    const projectId = params.id as string;
    const { data: hasAccess, isLoading, error } = useIsUserInProject(projectId);

    if (!projectId) {
        return (
            <div className="text-center text-white py-8">
                <p>Invalid project ID</p>
            </div>
        );
    }

    if (isLoading) {
        return <LoadingState message="Checking access..." />;
    }

    if (error || !hasAccess) {
        return (
            <ErrorState
                message="You don't have access to this project. Only project owners and members can view it."
                onRetry={() => router.push("/projects")}
            />
        );
    }

    return <>{children}</>;
}

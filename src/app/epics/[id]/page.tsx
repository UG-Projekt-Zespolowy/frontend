"use client";

import { useParams } from "next/navigation";
import { LoadingState, ErrorState, Button, PageLayout, PageHeader } from "@/app/core/components";
import { useEpic } from "@/app/core/hooks";
import { EpicBoard } from "@/app/features/board/epic-board";

export default function EpicPage() {
    const params = useParams();
    const epicId = params.id as string;
    const { data: epic, isLoading, error, refetch } = useEpic(epicId);

    if (!epicId) {
        return (
            <PageLayout>
                <div className="text-center text-white py-8">
                    <p>Invalid epic ID</p>
                </div>
            </PageLayout>
        );
    }

    if (isLoading) {
        return (
            <PageLayout>
                <LoadingState message="Loading epic..." />
            </PageLayout>
        );
    }

    if (error || !epic) {
        return (
            <PageLayout>
                <ErrorState
                    message="Failed to load epic. Please try again."
                    onRetry={() => refetch()}
                />
            </PageLayout>
        );
    }

    return (
        <PageLayout maxWidth="7xl">
            <PageHeader
                title={epic.title}
                actions={
                    <>
                        <Button href={`/projects/${epic.projectId}/epics`} variant="secondary">
                            Project epics
                        </Button>
                        <Button href={`/projects/${epic.projectId}/board`} variant="secondary">
                            Project board
                        </Button>
                    </>
                }
            />
            <EpicBoard epicId={epicId} epicTitle={epic.title} />
        </PageLayout>
    );
}



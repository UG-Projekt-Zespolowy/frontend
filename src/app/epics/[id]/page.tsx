"use client";

import { useParams } from "next/navigation";
import { Sidebar, LoadingState, ErrorState, Button } from "@/app/core/components";
import { useEpic } from "@/app/core/hooks";
import { EpicBoard } from "@/app/features/board/epic-board";

export default function EpicPage() {
    const params = useParams();
    const epicId = params.id as string;
    const { data: epic, isLoading, error, refetch } = useEpic(epicId);

    if (!epicId) {
        return (
            <div className="min-h-screen bg-linear-to-r from-purple-500 to-indigo-600 p-6">
                <Sidebar />
                <div className="text-center text-white py-8">
                    <p>Invalid epic ID</p>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-linear-to-r from-purple-500 to-indigo-600 p-6">
                <Sidebar />
                <LoadingState message="Loading epic..." />
            </div>
        );
    }

    if (error || !epic) {
        return (
            <div className="min-h-screen bg-linear-to-r from-purple-500 to-indigo-600 p-6">
                <Sidebar />
                <div className="max-w-5xl mx-auto pl-64">
                    <ErrorState
                        message="Failed to load epic. Please try again."
                        onRetry={() => refetch()}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-r from-purple-500 to-indigo-600 p-6">
            <Sidebar />
            <div className="max-w-7xl mx-auto pl-64">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold text-white drop-shadow-lg">{epic.title}</h1>
                    <div className="flex gap-3">
                        <Button href={`/projects/${epic.projectId}/epics`} variant="secondary">
                            Project epics
                        </Button>
                        <Button href={`/projects/${epic.projectId}/board`} variant="secondary">
                            Project board
                        </Button>
                    </div>
                </div>
                <EpicBoard epicId={epicId} epicTitle={epic.title} />
            </div>
        </div>
    );
}



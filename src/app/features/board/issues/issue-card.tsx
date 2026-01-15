"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useRouter } from "next/navigation";
import { type Issue } from "@/app/features/board/issues/types/issue.types";

interface IssueCardProps {
    readonly issue: Issue;
}

export function IssueCard({ issue }: IssueCardProps) {
    const router = useRouter();
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: issue.id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    const handleClick = () => {
        router.push(`/issues/${issue.id}`);
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            className="bg-linear-to-br from-purple-50 to-indigo-50 rounded-lg p-4 hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer border border-purple-200/50 hover:border-purple-300 relative"
        >
            <div
                {...listeners}
                className="absolute top-2 right-2 w-6 h-6 cursor-grab active:cursor-grabbing flex items-center justify-center text-gray-400 hover:text-gray-600"
                style={{ touchAction: "none" }}
                onClick={(e) => e.stopPropagation()}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                </svg>
            </div>
            <div onClick={handleClick}>
                <h3 className="font-semibold text-gray-800 mb-1 pr-8">{issue.title}</h3>
                {issue.description && (
                    <p className="text-sm text-gray-600 line-clamp-2">{issue.description}</p>
                )}
            </div>
        </div>
    );
}


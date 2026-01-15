export function getStatusColor(status: string): string {
    switch (status) {
        case "TO_DO":
            return "bg-gray-100 text-gray-800";
        case "IN_PROGRESS":
            return "bg-blue-100 text-blue-800";
        case "READY_FOR_REVIEW":
            return "bg-yellow-100 text-yellow-800";
        case "DONE":
            return "bg-green-100 text-green-800";
        case "CLOSED":
            return "bg-red-100 text-red-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
}

export function getStatusColorByColumnId(columnId: string): string {
    switch (columnId) {
        case "todo":
            return "bg-gray-100 text-gray-800";
        case "in-progress":
            return "bg-blue-100 text-blue-800";
        case "ready-for-review":
            return "bg-yellow-100 text-yellow-800";
        case "done":
            return "bg-green-100 text-green-800";
        case "closed":
            return "bg-red-100 text-red-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
}


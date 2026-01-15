export type ProjectRole = "PROJECT_MANAGER" | "MEMBER";

export interface UserProject {
    readonly id: string;
    readonly userId: string;
    readonly projectId: string;
    readonly role: ProjectRole;
    readonly isOwner: boolean;
    readonly joinedAt: string;
}


import type { User } from "@/app/core/types/user.types";

export interface Issue {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly status: string;
    readonly storyPoint?: number;
    readonly reporter: User;
    readonly assignee?: User;
    readonly epicId?: string;
}

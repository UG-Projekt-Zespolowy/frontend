export interface Issue {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly status: string;
    readonly storyPoint?: number;
    readonly reporterId: string;
    readonly assigneeId?: string;
    readonly epicId?: string;
}

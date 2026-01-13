import { COLUMN_IDS } from "./board.constants";

export const COLUMN_TO_STATUS_MAP: Readonly<Record<string, string>> = {
    [COLUMN_IDS.TODO]: "TO_DO",
    [COLUMN_IDS.IN_PROGRESS]: "IN_PROGRESS",
    [COLUMN_IDS.READY_FOR_REVIEW]: "READY_FOR_REVIEW",
    [COLUMN_IDS.DONE]: "DONE",
    [COLUMN_IDS.CLOSED]: "CLOSED",
} as const;

export const STATUS_TO_COLUMN_MAP: Readonly<Record<string, string>> = {
    TO_DO: COLUMN_IDS.TODO,
    IN_PROGRESS: COLUMN_IDS.IN_PROGRESS,
    READY_FOR_REVIEW: COLUMN_IDS.READY_FOR_REVIEW,
    DONE: COLUMN_IDS.DONE,
    CLOSED: COLUMN_IDS.CLOSED,
} as const;


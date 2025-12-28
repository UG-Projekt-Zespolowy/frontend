export const COLUMN_IDS = {
  TODO: "todo",
  IN_PROGRESS: "in-progress",
  READY_FOR_REVIEW: "ready-for-review",
  DONE: "done",
  CLOSED: "closed",
} as const;

export const COLUMN_TITLES = {
  [COLUMN_IDS.TODO]: "To Do",
  [COLUMN_IDS.IN_PROGRESS]: "In Progress",
  [COLUMN_IDS.READY_FOR_REVIEW]: "Ready For Review",
  [COLUMN_IDS.DONE]: "Done",
  [COLUMN_IDS.CLOSED]: "Closed",
} as const;

export const GRID_COLUMNS = {
  MOBILE: 1,
  DESKTOP: 5,
} as const;

export const COLUMN_MIN_HEIGHT = 500;
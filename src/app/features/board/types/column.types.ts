import { type Issue } from "@/app/features/board/issues";

export interface Column {
  readonly id: string;
  readonly title: string;
  readonly issues: readonly Issue[];
}

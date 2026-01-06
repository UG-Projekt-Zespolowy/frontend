export interface PageResponse<T> {
    readonly content: readonly T[];
    readonly totalElements: number;
    readonly totalPages: number;
    readonly size: number;
    readonly number: number;
}

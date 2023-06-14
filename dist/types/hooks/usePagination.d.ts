export declare const DOTS = "...";
type PaginationProps = {
    totalCount: number;
    pageSize: number;
    siblingCount: number;
    currentPage: number;
};
export declare const usePagination: ({ totalCount, pageSize, siblingCount, currentPage, }: PaginationProps) => (string | number)[];
export {};

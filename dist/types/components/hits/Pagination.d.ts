import { RefObject } from 'react';
type PaginationProps = {
    classNames?: PagerClassNames;
    hitsPerPage: number;
    ref: RefObject<HTMLDivElement>;
};
export type PagerClassNames = {
    wrapper?: string;
    pager?: string;
    pagerItem?: string;
};
declare const Pagination: import("react").ForwardRefExoticComponent<Omit<PaginationProps, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
export default Pagination;

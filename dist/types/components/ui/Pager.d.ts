import { MouseEventHandler } from 'react';
import { PagerClassNames } from '../hits/Pagination';
type PagerProps = {
    pagerClassNames?: PagerClassNames;
    currentPage: number;
    onNext: MouseEventHandler<HTMLButtonElement>;
    onPrevious: MouseEventHandler<HTMLButtonElement>;
    toPage: Function;
    lastPage: string | number;
    paginationRange: (string | number)[] | undefined;
};
declare const Pager: ({ pagerClassNames, currentPage, paginationRange, onPrevious, onNext, toPage, lastPage }: PagerProps) => import("react/jsx-runtime").JSX.Element;
export default Pager;

import { RefObject, forwardRef } from 'react';
import { usePagination } from 'react-instantsearch-hooks-web';
import { usePagination as usePaginationHook } from '../../hooks/usePagination';
import Pager from '../ui/Pager';

type PaginationProps = {
    classNames?: PagerClassNames;
    hitsPerPage: number;
    ref: RefObject<HTMLDivElement>;
}

export type PagerClassNames = {
    wrapper?: string;
    pager?: string
    pagerItem?: string;
}

const Pagination = forwardRef<HTMLDivElement, PaginationProps>(({ classNames, hitsPerPage }, ref) => {
    const { refine, currentRefinement, nbHits } = usePagination();
    const paginationRange = usePaginationHook({ totalCount: nbHits, pageSize: hitsPerPage, siblingCount: 1, currentPage: currentRefinement });

    if (!paginationRange || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        toPage(currentRefinement + 1);
    };

    const onPrevious = () => {
        toPage(currentRefinement - 1);
    };

    const toPage = (pageNumber: number) => {
        //@ts-ignore
        ref && ref.current?.scrollIntoView({ behavior: 'smooth' });

        refine(pageNumber);
    };

    const lastPage = paginationRange[paginationRange.length - 1];

    return (
        <Pager
            pagerClassNames={classNames}
            paginationRange={paginationRange}
            currentPage={currentRefinement}
            onNext={onNext}
            onPrevious={onPrevious}
            toPage={toPage}
            lastPage={lastPage}
        />
    );
});

export default Pagination;

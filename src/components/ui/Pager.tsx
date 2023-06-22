import classNames from 'classnames';
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import { DOTS } from '../../hooks/usePagination';
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

const Pager = ({ pagerClassNames, currentPage, paginationRange, onPrevious, onNext, toPage, lastPage }: PagerProps) => {
    return (
        <nav aria-label="pagination" className={classNames('mt-8 flex', pagerClassNames?.wrapper!)}>
            <ul className={classNames('isolate inline-flex flex-wrap items-center space-x-2 md:mb-8 md:pl-8 mx-auto')}>
                <li
                    className={classNames('pagination-item', {
                        'text-gray-300': currentPage < 1
                    })}
                >
                    <button
                        onClick={onPrevious}
                        className={classNames(
                            'bg-white disabled:hover:bg-white disabled:hover:text-inherit disabled:hover:cursor-not-allowed hover:bg-primary hover:text-white relative inline-flex h-10 w-10 items-center justify-center rounded-sm text-sm font-medium no-underline hover:no-underline focus:z-20 focus:no-underline',
                            pagerClassNames?.pagerItem
                        )}
                        disabled={currentPage < 1}
                    >
                        <ArrowLeftIcon className={classNames('mr-1 h-4 w-4', { 'fill-gray-300': currentPage < 1 })} />
                    </button>
                </li>

                {paginationRange &&
                    paginationRange.map((pageNumber, index) => {
                        const active = pageNumber === currentPage + 1;

                        if (pageNumber === DOTS) {
                            return (
                                <li key={index} className="pagination-item dots">
                                    &#8230;
                                </li>
                            );
                        }

                        return (
                            <li key={index} aria-current={active}>
                                <button
                                    className={classNames(
                                        'relative inline-flex h-10 w-10 items-center justify-center rounded-sm text-sm font-medium no-underline hover:no-underline focus:z-20 focus:no-underline',
                                        pagerClassNames?.pagerItem,
                                        {
                                            'bg-white text-gray-500 hover:bg-primary/10 hover:text-gray-600 focus:text-gray-500': !active,
                                            'z-10 bg-primary text-white hover:bg-primary-600 hover:text-white focus:text-white': active
                                        }
                                    )}
                                    onClick={() => typeof pageNumber === 'number' && toPage(pageNumber - 1)}
                                >
                                    {pageNumber}
                                </button>
                            </li>
                        );
                    })}

                <li
                    className={classNames('pagination-item', {
                        'text-gray-300': currentPage + 1 === lastPage
                    })}
                >
                    <button
                        onClick={onNext}
                        className={classNames('bg-white disabled:hover:bg-white disabled:hover:text-inherit disabled:hover:cursor-not-allowed hover:bg-primary hover:text-white relative inline-flex h-10 w-10 items-center justify-center rounded-sm text-sm font-medium no-underline hover:no-underline focus:z-20 focus:no-underline', pagerClassNames?.pagerItem)}
                        disabled={currentPage + 1 === lastPage}
                    >
                        <ArrowRightIcon className={classNames('ml-1 h-4 w-4', { 'fill-gray-300': currentPage + 1 === lastPage })} />
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pager;

import classNames from 'classnames';
import { PropsWithChildren } from 'react';
import { usePagination } from 'react-instantsearch-hooks';

export type HeaderClassNames = {
    wrapper?: string;
    totalHits?: string;
};

interface HeaderProps extends PropsWithChildren {
    classNamesList?: HeaderClassNames;
    messages?: { [key: string]: string }
}

const Header = ({ classNamesList, messages, children }: HeaderProps) => {
    const { nbHits } = usePagination();

    return (
        <div className={classNames(classNamesList?.wrapper, 'flex items-center py-3 border-b h-[45px]')}>
            <span className={classNames(classNamesList?.totalHits, 'text-sm')}>{nbHits} {messages?.results ?? 'result(s)'}</span>
            {children}
        </div>
    );
};

export default Header;

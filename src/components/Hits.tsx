import classNames from 'classnames';
import { Fragment, ReactNode } from 'react';
import { useHits } from 'react-instantsearch-hooks';
import Hit from './hits/Hit';
import { BaseHit, Hit as HitProps } from 'instantsearch.js';

export type HitsClassNames = {
    wrapper?: string;
    hit?: string;
    grid?: string;
};

type HitsProps = {
    renderHit?: ({ hit }: { hit: HitProps<any & BaseHit> }) => ReactNode;
    hitsClassNames?: HitsClassNames;
};

const Hits = ({ renderHit, hitsClassNames }: HitsProps) => {
    const { hits } = useHits();

    return (
        <div className={classNames(hitsClassNames?.grid, 'grid grid-cols-1 gap-8')}>
            {hits.map((hit) =>
                renderHit ? <Fragment key={`${hit.objectID}-${hit.id!}`}> {renderHit({ hit })}</Fragment> : <Hit hit={hit} />
            )}
        </div>
    );
};

export default Hits;

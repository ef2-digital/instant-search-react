import { ReactNode } from 'react';
import { BaseHit, Hit as HitProps } from 'instantsearch.js';
export type HitsClassNames = {
    wrapper?: string;
    hit?: string;
    grid?: string;
};
type HitsProps = {
    renderHit?: ({ hit }: {
        hit: HitProps<any & BaseHit>;
    }) => ReactNode;
    hitsClassNames?: HitsClassNames;
};
declare const Hits: ({ renderHit, hitsClassNames }: HitsProps) => import("react/jsx-runtime").JSX.Element;
export default Hits;

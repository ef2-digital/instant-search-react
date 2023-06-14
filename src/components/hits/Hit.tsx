import { BaseHit, Hit as HitProps } from 'instantsearch.js';

export type RenderHitProps = {
    hit: HitProps<any & BaseHit>;
}

const Hit = ({hit}: RenderHitProps) => {
    if (!hit) {
        return <></>
    }


    return <div>
            Hit
    </div>;
};

export default Hit;

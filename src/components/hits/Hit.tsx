import { BaseHit, Hit as HitProps } from 'instantsearch.js';

export type RenderHitProps = {
    hit: HitProps<any & BaseHit>;
}

const Hit = ({hit}: RenderHitProps) => {
    if (!hit) {
        return <></>
    }


    return <div>
            Hitsig
    </div>;
};

export default Hit;

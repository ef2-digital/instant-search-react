import { BaseHit, Hit as HitProps } from 'instantsearch.js';
export type RenderHitProps = {
    hit: HitProps<any & BaseHit>;
};
declare const Hit: ({ hit }: RenderHitProps) => import("react/jsx-runtime").JSX.Element;
export default Hit;

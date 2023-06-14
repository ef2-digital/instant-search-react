import { FilterableAttributeProps } from '../../InstantSearchWrapper';
import { ReactNode } from 'react';
export { default as AttributesMobile } from './Mobile';
export { default as AttributesDesktop } from './Desktop';
export type AttributeProps = {
    attributes: FilterableAttributeProps[];
    className?: string;
    renderTitle?: ReactNode;
    clearFilterLabel?: string;
};

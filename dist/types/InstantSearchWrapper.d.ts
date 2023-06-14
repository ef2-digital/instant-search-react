import { ReactNode } from 'react';
import { HitsClassNames } from './components/Hits';
import { RenderHitProps } from './components/hits/Hit';
import { RefinementSettingsProps, RefinementsClassNames } from './components/refinements';
import { InstantMeiliSearchInstance } from '@meilisearch/instant-meilisearch';
import { SearchClient } from 'algoliasearch';
import { PagerClassNames } from './components/hits/Pagination';
import { SortBySettingProps } from './components/SortBy';
export declare enum RefinementTypeEnum {
    List = "List",
    Range = "Range"
}
export type FilterableAttributeProps = {
    label: string;
    refinementType: RefinementTypeEnum;
    options: {
        attribute: string;
        sortBy?: string[];
    };
    settings?: RefinementSettingsProps;
    classNames?: RefinementsClassNames;
};
type classNamesList = {
    wrapper?: string;
    refinementsWrapper?: string;
    refinements?: RefinementsClassNames;
    hits?: HitsClassNames;
    pager?: PagerClassNames;
};
type renderProps = {
    renderRefinementsContent?: ReactNode;
    renderHitsContent?: ReactNode;
};
type SearchWrapperProps = {
    searchClient: InstantMeiliSearchInstance | SearchClient;
    indexName: string;
    hitsPerPage: number;
    classNamesList?: classNamesList;
    filterableAttributes?: FilterableAttributeProps[];
    sortableAttributes?: {
        items: {
            value: string;
            label: string;
        }[];
        settings: SortBySettingProps;
    };
    renderContent?: renderProps;
    renderHit?: ({ hit }: RenderHitProps) => JSX.Element;
    messages?: {
        [key: string]: string;
    };
};
declare const InstantSearchWrapper: ({ searchClient, indexName, hitsPerPage, classNamesList, filterableAttributes, sortableAttributes, renderContent, renderHit, messages }: SearchWrapperProps) => import("react/jsx-runtime").JSX.Element;
export default InstantSearchWrapper;

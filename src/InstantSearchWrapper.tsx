'use client';

import { ReactNode, useRef } from 'react';
import { Configure, InstantSearch } from 'react-instantsearch-hooks-web';
import classNames from 'classnames';
import Hits, { HitsClassNames } from './components/Hits';
import { RenderHitProps } from './components/hits/Hit';
import { RefinementSettingsProps, RefinementsClassNames } from './components/refinements';
import { SearchClient } from 'algoliasearch';
import Pagination, { PagerClassNames } from './components/hits/Pagination';
import SortBy, { SortBySettingProps } from './components/SortBy';
import { AttributesMobile, AttributesDesktop } from './components/attributes/';
import { history } from 'instantsearch.js/es/lib/routers';
import { type UiState } from 'instantsearch.js';
import Header, { HeaderClassNames } from './components/hits/Header';

export enum RefinementTypeEnum {
    List = 'List',
    Range = 'Range'
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
    header?: HeaderClassNames;
};

type renderProps = {
    renderRefinementsContent?: ReactNode;
    renderHitsContent?: ReactNode;
};

type SearchWrapperProps = {
    searchClient: any | SearchClient;
    indexName: string;
    hitsPerPage: number;
    classNamesList?: classNamesList;
    filterableAttributes?: FilterableAttributeProps[];
    sortableAttributes?: { items: { value: string; label: string }[]; settings: SortBySettingProps };
    renderContent?: renderProps;
    renderHit?: ({ hit }: RenderHitProps) => JSX.Element;
    messages?: { [key: string]: string };
};

const InstantSearchWrapper = ({
    searchClient,
    indexName,
    hitsPerPage,
    classNamesList,
    filterableAttributes,
    sortableAttributes,
    renderContent,
    renderHit,
    messages
}: SearchWrapperProps) => {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <div className={classNames(classNamesList?.wrapper, 'grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-4')}>
            <InstantSearch
                indexName={indexName}
                searchClient={searchClient}
                routing={{
                    router: history(),
                    stateMapping: {
                        //@ts-ignore
                        stateToRoute(uiState: UiState) {
                            const indexUiState = uiState[indexName];
                            return { ...indexUiState.refinementList, page: indexUiState.page };
                        },
                        //@ts-ignore
                        routeToState(routeState: UiState) {
                            return {
                                [indexName]: { refinementList: { ...routeState }, page: routeState.page }
                            };
                        }
                    }
                }}
            >
                <Configure //@ts-ignore
                    hitsPerPage={hitsPerPage ?? 20}
                />
                {filterableAttributes && (
                    <AttributesDesktop
                        className={classNamesList?.refinementsWrapper}
                        attributes={filterableAttributes}
                        renderTitle={renderContent?.renderRefinementsContent}
                        clearFilterLabel={messages && messages.clearFilters}
                    />
                )}

                <div className={classNames(classNamesList?.hits?.wrapper, 'md:col-span-3')} ref={ref}>
                    {renderContent?.renderHitsContent}

                    <Header classNamesList={classNamesList?.header} messages={messages}>
                        {filterableAttributes && (
                            <AttributesMobile
                                attributes={filterableAttributes}
                                renderTitle={renderContent?.renderRefinementsContent}
                                clearFilterLabel={messages && messages.clearFilters}
                            />
                        )}
                        {sortableAttributes && <SortBy items={sortableAttributes.items} settings={sortableAttributes.settings} />}
                    </Header>

                    <Hits renderHit={renderHit!} hitsClassNames={classNamesList?.hits} />

                    <Pagination ref={ref} hitsPerPage={hitsPerPage} classNames={classNamesList?.pager} />
                </div>
            </InstantSearch>
        </div>
    );
};

export default InstantSearchWrapper;
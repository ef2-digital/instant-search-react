import { PropsWithChildren } from 'react';
import { UseRefinementListProps } from 'react-instantsearch-hooks';

export type RefinementsClassNames = {
    wrapper?: string;
    labelWrapper?: string;
    label?: string;
};

type RangeValues = {
    step: number;
    labels: {
        from: string;
        to: string;
    };
};

export type RefinementSettingsProps = {
    defaultOpen?: boolean;
    defaultDisabled?: boolean;
    range?: RangeValues;
};

export type RefinementResults = {
    name: string;
    data: object;
};

export interface RefinementProps extends PropsWithChildren {
    attribute: string,
    label: string;
    className?: RefinementsClassNames;
    options?: UseRefinementListProps;
    settings?: RefinementSettingsProps;
    results?: RefinementResults;
}

export { default as Refinement } from './Refinement';
export {default as ClearRefinements} from './ClearRefinements';
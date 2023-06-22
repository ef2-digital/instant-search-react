import List from '../refinements/list/List';
import Range from '../refinements/range/Range';
import { Refinement } from '../refinements';
import { useHits } from 'react-instantsearch-hooks';
import { FilterableAttributeProps } from '../../InstantSearchWrapper';

const refinementComponents: any = {
    List: List,
    Range: Range
};

const Attributes = ({ attributes }: {attributes: FilterableAttributeProps[]}) => {
    const { results } = useHits();
    return (
        <>
            {attributes.map((attribute) => {
                const Component = refinementComponents[attribute.refinementType || 'list'];
                const filterResults = results?.disjunctiveFacets?.filter((result) => result.name === attribute.options.attribute);

                return (
                    <Refinement
                        attribute={attribute.options.attribute}
                        key={`refinement-${attribute.options.attribute}`}
                        label={attribute.label}
                        settings={attribute.settings}
                        className={attribute.classNames}
                    >
                        <Component {...attribute} results={filterResults?.pop()} />
                    </Refinement>
                );
            })}
        </>
    );
};

export default Attributes;

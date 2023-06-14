import { useRefinementList } from 'react-instantsearch-hooks';
import ListItem from './ListItem';
import { RefinementProps } from '..';

const List = ({ options }: RefinementProps) => {
    const { refine, items } = useRefinementList(options!);
    
    const refineItem = (attribute: string, isChecked: boolean) => {
        refine(attribute);
    };

    return <>{items && items.map((item) => <ListItem refineItem={refineItem} {...item} hasCount key={`list-item-${item.value}`} />)}</>;
};

export default List;

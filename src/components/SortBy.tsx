import { UseSortByProps, useSortBy } from 'react-instantsearch-hooks';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/Select';

interface SortByProps extends UseSortByProps {
    settings: SortBySettingProps
}

export type SortBySettingProps = {
    placeholder: string,
}

const SortBy = ({ items, settings }: SortByProps) => {
    const { options, refine } = useSortBy({ items: items });

    const sort = (value: string) => {
        refine(value);
    }

    return (
        <div className='flex ml-auto w-44'>
            <Select onValueChange={(value) => sort(value)}>
                <SelectTrigger className="border-none h-auto p-0">
                    <SelectValue placeholder={settings?.placeholder} />
                </SelectTrigger>
                <SelectContent className="bg-white">
                    {options.map((option) => (
                        <SelectItem key={`sortby-${option.value}`} value={`${option.value}`}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default SortBy;

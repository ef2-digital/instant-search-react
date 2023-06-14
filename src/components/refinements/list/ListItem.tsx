import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import classNames from 'classnames';

type ListItemProps = {
    value: string;
    label: string;
    highlighted?: string;
    count: number;
    isRefined: boolean;
    hasCount?: boolean;
    refineItem: (attribute: string, isChecked: boolean) => void;
};

const ListItem = ({ value, label, highlighted, count, isRefined, hasCount, refineItem }: ListItemProps) => {
    return (
        <div className="flex py-1">
            <Checkbox.Root
                className={classNames('h-5 w-5 rounded text-center bg-white border border-gray-300 focus:ring-indigo-500', {
                    '!bg-primary': isRefined
                })}
                defaultChecked={isRefined ?? false}
                onCheckedChange={(checked: boolean) => refineItem(value, checked)}
                checked={isRefined}
                id={`item${value}`}
            >
                <Checkbox.Indicator className="text-white">
                    <CheckIcon width={16} />
                </Checkbox.Indicator>
            </Checkbox.Root>
            <label htmlFor={`item${value}`} className="pl-4 text-sm flex w-full">
                {label} {hasCount && <span className="text-xs ml-auto">{count}</span>}
            </label>
        </div>
    );
};

export default ListItem;

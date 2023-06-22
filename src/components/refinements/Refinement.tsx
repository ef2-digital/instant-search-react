import classNames from 'classnames';
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { RefinementProps } from '.';
import { Collapsible, CollapsibleTrigger } from '../ui/Collapsible';
import { useInstantSearch } from 'react-instantsearch-hooks';

const Refinement = ({ attribute, label, className, settings, children }: RefinementProps) => {
    const { indexUiState } = useInstantSearch();
    const [open, setOpen] = useState<boolean>(settings?.defaultOpen ?? false);

    useEffect(() => {
        if (indexUiState.refinementList && attribute in indexUiState.refinementList) {
            setOpen(true)
        }

    }, [indexUiState.refinementList])

    const toggle = () => {
        setOpen(!open)
    }

    return (
        <Collapsible  className={classNames(className?.wrapper!, 'border-b border-gray-200 py-3')}>
            <CollapsibleTrigger
                className={classNames(
                    className?.labelWrapper,
                    'flex cursor-pointer w-full items-center justify-between py-2 text-sm'
                )}
                onClick={() => toggle()}
            >
                    {label} <span className='ml-auto'>{open ? <ChevronUpIcon /> : <ChevronDownIcon />}</span>
            </CollapsibleTrigger>
            <div className={classNames({"h-0 hidden": !open, 'h-auto': open})}>
                {children}
            </div>
        </Collapsible>
    );
};

export default Refinement;

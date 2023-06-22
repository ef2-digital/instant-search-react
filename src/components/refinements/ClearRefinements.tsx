import { Cross2Icon } from '@radix-ui/react-icons';
import { useClearRefinements } from 'react-instantsearch-hooks';

const ClearRefinements = ({ label }: { label?: string }) => {
    const { refine } = useClearRefinements();

    return (
        <div className="border-b border-gray-200 py-3 flex items-center text-sm cursor-pointer h-[45px]" onClick={() => refine()}>
            <Cross2Icon /> <span className="ml-1">{label ?? 'reset filters'}</span>
        </div>
    );
};

export default ClearRefinements;

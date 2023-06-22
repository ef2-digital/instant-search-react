import { useRange } from 'react-instantsearch-hooks';
import { RefinementProps, RefinementResults } from '..';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/Select';
import { useEffect, useState } from 'react';

const arrayRange = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step + 2 }, (value, index) => start + index * step).map(
        (number) => parseInt((number / 1000).toFixed()) * 1000
    );

const Range = ({ options, settings, results }: RefinementProps) => {
    const [givenResults, setResults] = useState<RefinementResults | undefined>(undefined);
    const [min, setMin] = useState<number | undefined>(undefined);
    const [max, setMax] = useState<number | undefined>(undefined);

    const [rangesMin, setRangesMin] = useState<number[]>([]);
    const [rangesMax, setRangesMax] = useState<number[]>([]);

    const { refine } = useRange({min: min, max: max, ... options!});

    useEffect(() => {
        if (!results) {
            return;
        }

        if (!givenResults) {
            setResults(results);
        }
    }, [results]);

    useEffect(() => {
        if (!givenResults) {
            return;
        }

        const resultRange = Object.keys(givenResults.data)
            .map(Number)
            .sort((a, b) => a - b);

        setMin(resultRange?.shift()!);
        setMax(resultRange?.pop()!);
    }, [givenResults]);

    useEffect(() => {
        if (!min && !max) {
            return;
        }

        setRangesMin(arrayRange(min!, max!, settings?.range?.step!));
        setRangesMax(arrayRange(min!, max!, settings?.range?.step!));
    
    }, [min, max]);

    const changeMin = (value: string) => {        
        setRangesMax(arrayRange(parseInt(value), max!, settings?.range?.step!));
        refine([parseInt(value), Number.isFinite(max) ? max : undefined]);
    };
    const changeMax = (value: string) => {
        setRangesMax(arrayRange(min!, parseInt(value), settings?.range?.step!));        
        refine([Number.isFinite(min) ? min : undefined, parseInt(value)]);
    };

    return (
        <div className="flex gap-x-2 justify-start">
            <Select onValueChange={(value) => changeMin(value)}>
                <SelectTrigger className="bg-white">
                    <SelectValue placeholder={settings?.range?.labels.from} />
                </SelectTrigger>
                <SelectContent className="bg-white">
                    {rangesMin.map((range) => (
                        <SelectItem key={`range-from-${range}`} value={`${range}`}>
                            {range}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Select onValueChange={(value) => changeMax(value)}>
                <SelectTrigger className="bg-white">
                    <SelectValue placeholder={settings?.range?.labels.to} />
                </SelectTrigger>
                <SelectContent className="bg-white">
                    {rangesMax.map((range) => (
                        <SelectItem key={`range-till-${range}`} value={`${range}`}>
                            {range}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default Range;

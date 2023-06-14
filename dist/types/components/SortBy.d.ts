import { UseSortByProps } from 'react-instantsearch-hooks';
interface SortByProps extends UseSortByProps {
    settings: SortBySettingProps;
}
export type SortBySettingProps = {
    placeholder: string;
};
declare const SortBy: ({ items, settings }: SortByProps) => import("react/jsx-runtime").JSX.Element;
export default SortBy;

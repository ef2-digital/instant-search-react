type ListItemProps = {
    value: string;
    label: string;
    highlighted?: string;
    count: number;
    isRefined: boolean;
    hasCount?: boolean;
    refineItem: (attribute: string, isChecked: boolean) => void;
};
declare const ListItem: ({ value, label, highlighted, count, isRefined, hasCount, refineItem }: ListItemProps) => import("react/jsx-runtime").JSX.Element;
export default ListItem;

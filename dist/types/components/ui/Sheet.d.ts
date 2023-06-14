import { ComponentPropsWithoutRef, HTMLAttributes } from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { type VariantProps } from "class-variance-authority";
declare const Sheet: import("react").FC<SheetPrimitive.DialogProps>;
declare const SheetTrigger: import("react").ForwardRefExoticComponent<SheetPrimitive.DialogTriggerProps & import("react").RefAttributes<HTMLButtonElement>>;
declare const SheetClose: import("react").ForwardRefExoticComponent<SheetPrimitive.DialogCloseProps & import("react").RefAttributes<HTMLButtonElement>>;
declare const sheetVariants: (props?: {
    position?: "top" | "right" | "bottom" | "left";
    size?: "content" | "default" | "sm" | "lg" | "xl" | "full";
} & import("class-variance-authority/dist/types").ClassProp) => string;
export interface DialogContentProps extends ComponentPropsWithoutRef<typeof SheetPrimitive.Content>, VariantProps<typeof sheetVariants> {
}
declare const SheetContent: import("react").ForwardRefExoticComponent<DialogContentProps & import("react").RefAttributes<HTMLDivElement>>;
declare const SheetHeader: {
    ({ className, ...props }: HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const SheetFooter: {
    ({ className, ...props }: HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const SheetTitle: import("react").ForwardRefExoticComponent<Omit<SheetPrimitive.DialogTitleProps & import("react").RefAttributes<HTMLHeadingElement>, "ref"> & import("react").RefAttributes<HTMLHeadingElement>>;
declare const SheetDescription: import("react").ForwardRefExoticComponent<Omit<SheetPrimitive.DialogDescriptionProps & import("react").RefAttributes<HTMLParagraphElement>, "ref"> & import("react").RefAttributes<HTMLParagraphElement>>;
export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription, };

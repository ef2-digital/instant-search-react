import { MixerHorizontalIcon } from '@radix-ui/react-icons';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/Sheet';
import Attributes from './Attributes';
import { AttributeProps } from '.';
import { ClearRefinements } from '../refinements';
import { ScrollArea } from '../ui/ScrollArea';

const AttributesMobile = ({ attributes, renderTitle, clearFilterLabel }: AttributeProps) => {
    return (
        <div className="block md:hidden">
            <Sheet>
                <SheetTrigger className="p-3 bg-white text-black rounded-md border">
                    <MixerHorizontalIcon />
                </SheetTrigger>
                <SheetContent size="xl" position="left" className="bg-white">
                    <SheetHeader>
                        <SheetTitle>{renderTitle}</SheetTitle>
                    </SheetHeader>
                    <ScrollArea className="h-[90%] w-[90%]">
                            <ClearRefinements label={clearFilterLabel} />
                            <Attributes attributes={attributes} />
                        </ScrollArea>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default AttributesMobile;

import classNames from 'classnames';
import Attributes from './Attributes';
import { AttributeProps } from '.';
import { ClearRefinements } from '../refinements';

const AttributesDesktop = ({ attributes, className, renderTitle, clearFilterLabel }: AttributeProps) => {
    return (
        <>
            <div className={classNames('hidden md:block', className)}>
                {renderTitle}

                <ClearRefinements label={clearFilterLabel} />

                <Attributes attributes={attributes} />
            </div>
        </>
    );
};

export default AttributesDesktop;

import { ReactHooksDemoComponentLevelOne } from './reactHooksDummyLevelOne';
import * as React from 'react';

export const ReactHooksDemoComponent = (props: any) => {
    return (
        <div className="react-hooks__container">
            <p>I am a component wrapper</p>
            <p>{props.wrapperValue ? `I know the global state` : `I don't know the global state`}</p>
            <p>{props.onRevert ? `I can revert the global state` : `I can't revert the global state`}</p>
            <ReactHooksDemoComponentLevelOne {...props} />
        </div>
    );
};

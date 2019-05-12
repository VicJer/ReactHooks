import { ReactHooksDemoComponentLevelTwo } from './reactDummyLevelTwo';
import * as React from 'react';

export const ReactHooksDemoComponentLevelOne = (props: any) => {
    return (
        <div className="react-hooks__container">
            <p>I am a component level one</p>
            <p>{props.wrapperValue ? `I know the global state` : `I don't know the global state`}</p>
            <p>{props.onRevert ? `I can revert the global state` : `I can't revert the global state`}</p>
            <ReactHooksDemoComponentLevelTwo {...props} />
        </div>
    );
};

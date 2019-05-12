import * as React from 'react';
export const ReactHooksDemoComponentLevelTwo = (props:any) => {
    return (
        <div className="react-hooks__container">
            <p>I am a component level two I render whatever is in wrapper state</p>
            <p>{props.wrapperValue ? `I know the global state` : `I don't know the global state`}</p>
            <p>{props.onRevert ? `I can revert the global state` : `I can't revert the global state`}</p>
            <div style={{ padding: '20px', border: '1px solid pink' }}>
                {props.wrapperValue}
                <p>
                    <button onClick={props.onRevert}>I can revert state</button>
                </p>
            </div>
        </div>
    );
};
/*V2
export const ReactHooksDemoComponentLevelTwo = (props:any) => {
    const myContext:any = useContext(reactHooksContext);
    const {wrapperValue, onRevert} = myContext;
    return (
        <div style={{padding: '20px', border: '1px solid black'}}>
            <p>I am a component level two I render whatever is in wrapper state</p>
            <p>{wrapperValue ? `I know the global state` : `I don't know the global state`}</p>
            <p>{onRevert ? `I can revert the global state` : `I can't revert the global state`}</p>
            <div style={{padding: '20px', border: '1px solid pink'}}>
                {wrapperValue}
                <p><button onClick={onRevert}>I can revert state</button></p>
            </div>
        </div>
    )
};
*/

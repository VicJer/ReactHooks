import * as React from 'react';

export const NeverChangesComponent = (props: any) => {
    return <p className="react-hooks__container">{props.neverChange}</p>;
};

/*v2
export const NeverChangesComponent = () => {
    let myContext:any  = useContext(reactHooksContext);
    let neverChange = myContext.neverChange;
    return (<p className="react-hooks__container">{neverChange}</p>)

}
*/

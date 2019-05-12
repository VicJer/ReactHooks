import * as React from 'react';

const reactHooksContext = React.createContext(null);
const { Provider, Consumer } = reactHooksContext;

const ReactHooksContextProvider = (props: any) => {
    return <Provider value={{ ...props }}>{props.children}</Provider>;
};

export { ReactHooksContextProvider, reactHooksContext };

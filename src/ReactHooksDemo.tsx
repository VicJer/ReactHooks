import * as React from 'react';
import {Component} from "react";
import {ReactHooksDemoComponent} from "./ReactHooks/reactHooksDummyComponent";
import {NeverChangesComponent} from "./ReactHooks/neverChangeComponent";

/* V1 - Class component*/
class ReactHooksDemo extends Component {
    state: any;
    stateTimeout: any;
    constructor(props: any) {
        super(props);
        this.state = {
            myInitialValue: `I'm gonna change at some point`,
            neverChanges: `This value never changes`,
            someOtherValue: null
        };

        this.changeWrapperState = this.changeWrapperState.bind(this);
        this.revertState = this.revertState.bind(this);
    }

    componentDidMount(): void {
        this.stateTimeout = setTimeout(()=> this.setState({ someOtherValue: `I got da values` }), 1000)

    }

    componentWillUnmount(): void {
        clearTimeout(this.stateTimeout);
    }

    changeWrapperState() {
        this.setState({ myInitialValue: `Omg I changed so much` });
    }

    revertState() {
        this.setState({ myInitialValue: `I'm gonna change at some point` });
    }

    render() {
        return (
            <div className="valuation-report">
                <div className="header-container">
                    <h1>React Hooks Demo</h1>
                </div>
                <div className="card">
                    {this.state.someOtherValue && <p>{this.state.someOtherValue}</p>}
                    <button onClick={this.changeWrapperState}>Change Global State</button>
                    <div className="card-body">
                        <ReactHooksDemoComponent
                            wrapperValue={this.state.myInitialValue}
                            neverChange={this.state.neverChanges}
                            onRevert={this.revertState}
                        />
                        <NeverChangesComponent neverChange={this.state.neverChanges} />
                    </div>
                </div>
            </div>
        );
    }
}
/* V2 - function component with basic hooks
const ReactHooksDemo = () => {

    const [myInitialValue, setMyInitialValue] = useState(`I'm gonna change at some point`);
    const [someOtherValue, setSomeOtherValue] = useState(null);
    const [neverChanges, ] = useState(`This value never changes`);

    const changeWrapperState = () => setMyInitialValue(`Omg I changed so much`);
    const revertState = () => setMyInitialValue(`I'm gonna change at some point`);

    useEffect( ()=>{
    const timer = setTimeout(()=>setSomeOtherValue(`I got da values`),1000);
    return () => clearTimeout(timer);
    } ,[])

    return (
            <div className="valuation-report">
                <div className="header-container">
                    <h1>React Hooks Demo</h1>
                </div>
                <div className="card">
                    {someOtherValue && <p>{someOtherValue}</p>}
                    <button onClick={changeWrapperState}>Change Global State</button>
                    <div className="card-body">
                      <ReactHooksDemoComponent
                                wrapperValue={myInitialValue}
                                neverChange={neverChanges}
                                onRevert={revertState}
                            />
                            <NeverChangesComponent neverChange={neverChanges}/>
                    </div>
                </div>
            </div>
        );
};
*/

/* V3 - function component with context
const ReactHooksDemo = () => {

    const [myInitialValue, setMyInitialValue] = useState(`I'm gonna change at some point`);
    const [someOtherValue, setSomeOtherValue] = useState(null);
    const [neverChanges, ] = useState(`This value never changes`);

    const changeWrapperState = () => setMyInitialValue(`Omg I changed so much`);
    const revertState = () => setMyInitialValue(`I'm gonna change at some point`);

    useEffect( ()=>{
    const timer = setTimeout(()=>setSomeOtherValue(`I got da values`),1000);
    return () => clearTimeout(timer);
    } ,[])

    return (
            <div className="valuation-report">
                <div className="header-container">
                    <h1>React Hooks Demo</h1>
                </div>
                <div className="card">
                    {someOtherValue && <p>{someOtherValue}</p>}
                    <button onClick={changeWrapperState}>Change Global State</button>
                    <div className="card-body">
                        <ReactHooksContextProvider
                            wrapperValue={myInitialValue}
                            neverChange={neverChanges}
                            onRevert={revertState}
                        >
                            <ReactHooksDemoComponent/>
                            <NeverChangesComponent />
                        </ReactHooksContextProvider>

                    </div>
                </div>
            </div>
        );
};
*/

/* V4 - function component with abstracted state management to custom hook
        useMemo to stop unnecessary react rerenders

const useMyAwesomeHook = () => {
    const [myInitialValue, setMyInitialValue] = useState(`I'm gonna change at some point`);
    const [someOtherValue, setSomeOtherValue] = useState(null);
    const [neverChanges, ] = useState(`This value never changes`);

    return [myInitialValue, setMyInitialValue, someOtherValue, setSomeOtherValue, neverChanges]
};

const ReactHooksDemo = () => {

    const [myInitialValue, setMyInitialValue, someOtherValue, setSomeOtherValue, neverChanges] = useMyAwesomeHook()

    const changeWrapperState = () => setMyInitialValue(`Omg I changed so much`);
    const revertState = () => setMyInitialValue(`I'm gonna change at some point`);

    useEffect( ()=>{
    const timer = setTimeout(()=>setSomeOtherValue(`I got da values`),1000);
    return () => clearTimeout(timer);
    } ,[])

    const Memoized = () => useMemo(() => <NeverChangesComponent />, [neverChanges]);

    return (
            <div className="valuation-report">
                <div className="header-container">
                    <h1>React Hooks Demo</h1>
                </div>
                <div className="card">
                    {someOtherValue && <p>{someOtherValue}</p>}
                    <button onClick={changeWrapperState}>Change Global State</button>
                    <div className="card-body">
                        <ReactHooksContextProvider
                            wrapperValue={myInitialValue}
                            neverChange={neverChanges}
                            onRevert={revertState}
                        >
                            <ReactHooksDemoComponent/>
                            <Memoized />
                        </ReactHooksContextProvider>

                    </div>
                </div>
            </div>
        );
};
*/
/* V5 - function component with abstracted state management to useReducer hook

const myAwesomeReducer = (state, action) => {
    switch (action.type) {
        case 'initialValue':
            return {...state, myInitialValue: action.payload};
        case 'someOtherValue':
            return {...state, someOtherValue: action.payload};
        case 'neverChanges':
            return {...state, neverChanges: action.payload};
        default:
            throw new Error('Boo!')
    }
}

const useMyAwesomeHook = () => {

    const initialState = {
        myInitialValue: `I'm gonna change at some point`,
        someOtherValue: null,
        neverChanges: `This value never changes`
    };

    const [state, dispatch] = useReducer(myAwesomeReducer, initialState)

    return [state, dispatch]
};

const ReactHooksDemo = () => {
    const [state, dispatch] = useMyAwesomeHook();

    const changeWrapperState = () => dispatch({type: 'initialValue', payload: `Omg I changed so much`});
    const revertState = () => dispatch({type: 'initialValue', payload: `I'm gonna change at some point`});

    useEffect( () => {
        const timer = setTimeout(() => dispatch({type: 'someOtherValue', payload: `I got da values`}),1000);
        return () => clearTimeout(timer);
    }
    , []);

    const Memoized = () => useMemo(() => <NeverChangesComponent />, [state.neverChanges]);

    return (
        <div className="valuation-report">
            <div className="header-container">
                <h1>React Hooks Demo</h1>
            </div>
            <div className="card">
                {state.someOtherValue && <p>{state.someOtherValue}</p>}
                <button onClick={changeWrapperState}>Change Global State</button>
                <div className="card-body">
                    <ReactHooksContextProvider
                        wrapperValue={state.myInitialValue}
                        neverChange={state.neverChanges}
                        onRevert={revertState}
                    >
                        <ReactHooksDemoComponent/>
                        <Memoized />
                    </ReactHooksContextProvider>

                </div>
            </div>
        </div>
    );
};
 */


/* V6 - useRef to store references

const myAwesomeReducer = (state:any, action:any) => {
    switch (action.type) {
        case 'initialValue':
            return {...state, myInitialValue: action.payload};
        case 'someOtherValue':
            return {...state, someOtherValue: action.payload};
        case 'neverChanges':
            return {...state, neverChanges: action.payload};
        default:
            throw new Error('Boo!')
    }
};

const useMyAwesomeHook = () => {

    const initialState = {
        myInitialValue: `I'm gonna change at some point`,
        someOtherValue: null,
        neverChanges: `This value never changes`
    };

    const [state, dispatch] = useReducer(myAwesomeReducer, initialState)

    return [state, dispatch]
};

const ReactHooksDemo = () => {
    const [state, dispatch] = useMyAwesomeHook();
    const timerRef:any = useRef(null);
    const buttonRef = useRef(null);

    const changeWrapperState = () =>{
        dispatch({type: 'initialValue', payload: `Omg I changed so much`});
        console.log(buttonRef.current);
        clearTimeout(timerRef.current);
    };
    const revertState = () => dispatch({type: 'initialValue', payload: `I'm gonna change at some point`});

    useEffect( () => {
            timerRef.current = setTimeout(() => dispatch({type: 'someOtherValue', payload: `I got da values`}),5000);
            return () => clearTimeout(timerRef.current);
        }
    , []);

    const Memoized = () => useMemo(() => <NeverChangesComponent />, [state.neverChanges]);

    return (
        <div className="valuation-report">
            <div className="header-container">
                <h1>React Hooks Demo</h1>
            </div>
            <div className="card">
                {state.someOtherValue && <p>{state.someOtherValue}</p>}
                <button ref={buttonRef} onClick={changeWrapperState}>Change Global State</button>
                <div className="card-body">
                    <ReactHooksContextProvider
                        wrapperValue={state.myInitialValue}
                        neverChange={state.neverChanges}
                        onRevert={revertState}
                    >
                        <ReactHooksDemoComponent/>
                        <Memoized />
                    </ReactHooksContextProvider>

                </div>
            </div>
        </div>
    );
};
 */

export default ReactHooksDemo;

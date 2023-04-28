import { useReducer } from 'react';
import  HomeContext  from './HomeContext';
import reducer,{initState} from './reducer'

function Provider({ children }) {
    const [state,dispatch] = useReducer(reducer,initState);
    return (<HomeContext.Provider value={[state,dispatch]}>
        {children}
        </HomeContext.Provider>);
}

export default Provider;

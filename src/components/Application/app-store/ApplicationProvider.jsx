import { useReducer } from 'react';
import  ApplicationContext  from './ApplicationContext';
import reducer,{initState} from './reducer'

function Provider({ children }) {
    const [state,dispatch] = useReducer(reducer,initState);
    return (<ApplicationContext.Provider value={[state,dispatch]}>
        {children}
        </ApplicationContext.Provider>);
}

export default Provider;

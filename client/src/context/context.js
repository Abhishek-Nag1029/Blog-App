import {createContext,useEffect,useReducer} from "react";
import Reducer from "./reducer";

const INITIAL_STATE={
    user:JSON.parse(localStorage.getItem("user"))||null,
    isFetching:false,
    error:false,
};
export const Context=createContext(INITIAL_STATE); //here the global state is saved


export const ContextProvider=({children})=>{
const [state,dispatch]=useReducer(Reducer,INITIAL_STATE);  

useEffect(()=>{
    localStorage.setItem("user",JSON.stringify(state.user));
},[state.user]); 
return(
    <Context.Provider // value are those object which we give access to the childrens
     value={{
        user:state.user,
        isFetching:state.isFetching,
         error:state.error,
         dispatch,
    }}>  
   
{children}
    </Context.Provider>
)
}
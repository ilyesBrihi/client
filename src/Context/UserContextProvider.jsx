import { createContext , useReducer } from "react";

export const userContext = createContext();
const UserContextProvider = (props) => {
//     const getUser = () => {
//     const usertoken = sessionStorage.getItem("token") ? sessionStorage.getItem("token") : null;
//     const userdata = usertoken ? decode token : null,
// return userdata;    
// }
    const reducer = (state,action) => {
        if(action.type === "LOGOUT"){
            return null; //placeholder
        }
    }
    const [user , dispatch] = useReducer(reducer, {id:1,username:"",email:"",password:"",role:1} /*placeholder for getUser() */ )
    
    return ( 
        <userContext.Provider value={{user , dispatch}}>
            {props.children}
        </userContext.Provider>
     );
}
 
export default UserContextProvider;
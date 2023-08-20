import React, { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
    //trying to fetch user from local storage
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'))

        if(user){ 
            dispatch({type: "LOGIN", payload:user})
        }
        
    },[])
  const [state, dispatch] = useReducer(authReducer, { user: null });
  console.log("authContext State: ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

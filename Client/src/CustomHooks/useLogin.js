import { useState } from "react";
import { userAuthContext } from "./userAuthContext";

export const useLogin = () => {
    const [error, setError]=useState(null)
    const [isLoading, stIsLoading]=useState(null)
    const {dispatch} = userAuthContext()

    const login = async (name,password) =>{
        stIsLoading(true)
        setError(null)
        const response = await fetch('https://afpserver.onrender.com/user/login',{
            method: "POST",
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({name,password})
        })

    const json = await response.json()
if (!response.ok){
    stIsLoading(false)
    setError(json.error)
}
if (response.ok){
    //save the user to lacal
    console.log("should be saving")
    console.log(JSON.stringify(json))
    localStorage.setItem('user',JSON.stringify(json))
    dispatch({type:'LOGIN',payload:json})
    stIsLoading(false)
    
 
}

    }
    return{login,isLoading,error}
}
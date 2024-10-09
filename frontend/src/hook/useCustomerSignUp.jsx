




import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

export const useCustomerSignUp = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const signUp = async (name,email, address,phone,password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:8020/customerRegister', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({name,email, address, phone,password})
        }) 

        const json = await response.json()

        if(!response.ok) {
            setIsLoading(false)
            setError(json.error) 
        }
        if (response.ok) {
            //Save token 
            localStorage.setItem('user', JSON.stringify(json))

            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)
        }
    }

    return {signUp, isLoading, error}
}
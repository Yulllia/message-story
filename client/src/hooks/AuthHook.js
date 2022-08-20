import { useState,useCallback, useEffect} from "react";


const storageName  = 'userData'

export const useAuth = () =>{
    const [token, setToken] = useState(null);
    const [userName, setUserName] = useState(null);

    const login = useCallback((jwtToken, name, image)=>{
        setToken(jwtToken)
        setUserName(name)
        if (name) {
            localStorage.setItem(storageName, JSON.stringify({token:jwtToken, name:name, image:image}))
        }
    },[])

    const logout = useCallback(()=>{
        setToken(null)
        setUserName(null)
        localStorage.removeItem(storageName)
    },[])


    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem(storageName))
        if(data && data.token){
            login(data.token, data.userId)
        }
    },[login])

    return {login, logout, token, userName}
}
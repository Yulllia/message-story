import { useEffect, useState} from "react";
import { useRef } from "react";

function useAuthStatus() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(true);
    const isMounted = useRef(true);
    useEffect(() => {
        if(isMounted){
            let getData = JSON.parse(localStorage.getItem('userData'));
                if (getData) {
                    setLoggedIn(true)
                }
                setCheckingStatus(false);
        }
      return ()=>{
      isMounted.current = false
      }
    },[isMounted])
    
    return { loggedIn, checkingStatus }
}

export default useAuthStatus
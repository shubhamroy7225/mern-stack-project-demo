import { useCallback, useEffect, useState } from "react";

let logoutTimer;
export const useAuth = ()=>{
    const [token, setToken] = useState(null);
    const [tokenExpirationDate,setTokenExpirationDate]= useState()
    const [userId, setUserId] = useState();
    const login = useCallback((uid, token, expirationDate) => {
      setToken(token);
      setUserId(uid);
      const tokenExpirationDate =
        expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60)
        setTokenExpirationDate(tokenExpirationDate)
      localStorage.setItem(
        "userData",
        JSON.stringify({
          userId: uid,
          token: token,
          expiration: tokenExpirationDate,
        })
      );
    }, []);
    const logout = useCallback(() => {
      setToken(null);
      setUserId(null);
      localStorage.removeItem("userData");
    }, []);
    useEffect(() => {
      if (token && tokenExpirationDate) {
        let remainingTime =  tokenExpirationDate.getTime()-new Date().getTime()
        logoutTimer= setTimeout(logout,remainingTime);
      } else {
        clearTimeout(logoutTimer);
      }
    },[token,logout,tokenExpirationDate]);
  
    useEffect(() => {
      const storageData = JSON.parse(localStorage.getItem("userData"));
      if (
        storageData &&
        storageData.token &&
        new Date(storageData.expiration) > new Date()
      ) {
        login(storageData.userId, storageData.token, new Date(storageData.expiration));
      }
    }, [login]);
  return {token,login,logout,userId}
}
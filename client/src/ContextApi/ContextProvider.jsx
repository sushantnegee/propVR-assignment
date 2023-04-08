import React, { createContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

export const AppContext = createContext();

const ContextProvider = ({children}) => {
    const [user,setUser] = useState();
    const [loggedIn,setLoggedIn] = useState(false);
    // let userData = useSelector((storeData) => {
    //     return storeData.userDetails;
    // })
    // console.table( "strore data ===>>>",userData)

    useEffect(()=>{
        // localStorage.setItem("userData",JSON.stringify(userData));
        // setUser(userData);
        let userDetails = JSON.parse(localStorage.getItem('userDetails'));
        setUser(userDetails);
    },[loggedIn])

    console.log('user Details ==>',user)
  return (
    <AppContext.Provider value={{
        user,
        setUser,
        loggedIn,
        setLoggedIn
    }}>
        {children}
    </AppContext.Provider>
  )
}

export default ContextProvider
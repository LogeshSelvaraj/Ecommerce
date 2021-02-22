import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import RouteRedirect from "./RouteRedirect"
import {useHistory} from 'react-router-dom'
import { useState,useEffect } from "react";

const UserRoute =  ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const history=useHistory()

  const [count,setCount]=useState(5)

  useEffect(() => {
  const interval=  setInterval(()=>{setCount((prev)=>--prev)},1000)
    return () => {
      clearInterval(interval)
    }
  }, [count])

 

  return user && user.token ? (
    <Route {...rest}  />
  ) : (
    <>
   <RouteRedirect/>
   {count===0&&history.push("/")}
   </>
  );
  
};

export default UserRoute;

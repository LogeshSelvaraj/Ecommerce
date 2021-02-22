import React from "react";
import { Route } from "react-router";
import { useSelector } from "react-redux";
import RouteRedirect from "./RouteRedirect";
import { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";

const AdminRoute = ({ children, ...rest }) => {
  const history = useHistory();
  const { user } = useSelector((state) => ({ ...state }));

  const [count, setCount] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => --prev);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [count]);

  

    
  return user&&user.role === "admin" ? (
    <Route {...rest} />
  ) : (
    <>
      <RouteRedirect />
      {count === 0 && history.push("/")}
    </>
  );
};

export default AdminRoute;

import React,{useEffect} from "react";
import {useDispatch} from 'react-redux'
import {auth} from '../firebase'
import { getUser } from "./Api";



export const UpdatingStates = () => {
    const dispatch = useDispatch();

    const roleBasedSidebar = (role) => {
      if (role === "admin") {
        dispatch({
          type: "LOGINAS_ADMIN",
        });
      } else {
        dispatch({
          type: "LOGINAS_USER",
        });
      }
    };

    useEffect(() => {
      const unsubcribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
          const idToken = (await user.getIdTokenResult()).token;
          getUser(idToken)
            .then((res) => {
               roleBasedSidebar(res.data.role);
              dispatch({
                type: "LOGIN_USER",
                payload: {
                  name: res.data.name,
                  email: res.data.email,
                  token: idToken,
                  role: res.data.role,
                  _id: res.data._id,
                },
              });
             
            })
            .catch((err) => console.log(err));
        }
      });
      return () => unsubcribe();
    }, []);
}

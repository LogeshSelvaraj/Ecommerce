import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import Category from "./Category";
import DashboardIcon from '@material-ui/icons/Dashboard';
// import { getCategories } from "../../../functions/CategoryApi";
// import { getSubs } from "../../../functions/SubCategory";
import {useSelector} from "react-redux"

const NavLeftItems =() =>{

    const {user}=useSelector((state)=>({...state}))

    // const loadcategory = () => {
    //   getCategories().then((res) => {
    //     setValues();
    //   });
    // };
  
    // const loadSubcategory = () => {
    //   getSubs().then((res) => {
    //     setValues();
    //   });
    // };
    
    return (
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <a className="nav-link navbar-myicon" href="/">
            <HomeIcon />
            <span className="navbar-icon-title">Home</span>
          </a>
        </li>
        <Category/>
      {  user&&user.role==="admin"&& <li className="nav-item active ">
          <a className="nav-link navbar-myicon" href="/admin/dashboard">
          <span className="coloring">
          <DashboardIcon />
            <span className="navbar-icon-title">Dashboard</span>
          </span>
          </a>
        </li> }
      </ul>
    );

}

export  default  NavLeftItems
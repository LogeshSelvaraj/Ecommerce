import React from "react";
import PersonIcon from "@material-ui/icons/Person";
import {useSelector} from "react-redux"
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import {useHistory} from 'react-router-dom';
import DropDown from "./DropDown";


const NavRightItems = () => {
  const user=useSelector((state)=> state.user)
  let history=useHistory()

  const  handleLogin=()=>{
      history.push({
        pathname:"/login",
        state:{ from:window.location.pathname }
      })
    }

  return (
    <ul className="navbar-nav ">
      {!user && (
        <>
          <li className="nav-item">
            <a className="nav-link navbar-myicon" onClick={handleLogin}>
              <span className="coloring">
                <PersonIcon />
                <span className="navbar-icon-title">Login</span>
              </span>
            </a>
          </li>
          <li className="nav-item ">
            <a className="nav-link navbar-myicon" href="/register">
              <span className="coloring">
                <PersonAddIcon />
                <span className="navbar-icon-title">Register</span>
              </span>
            </a>
          </li>
        </>
      )}{" "}
      {user && <DropDown />}
    </ul>
  );
};

export default NavRightItems;

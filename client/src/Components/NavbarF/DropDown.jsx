import React from "react";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import {useDispatch,useSelector} from "react-redux"
import firebase from "firebase"
import {useHistory} from "react-router-dom"



const DropDown =() =>{

  const user=useSelector((state)=> state.user)


  const history=useHistory()
  const dispatch=useDispatch()

    function handleClick() {
        firebase.auth().signOut()
        dispatch({
          type:"LOGOUT_USER",
          payload:null
        })
        history.push('/login')
    }

    return (
      <li className="nav-item dropdown ">
        <a
          className={`nav-link dropdown-toggle navbar-myicon`}
          href="/"
          id="navbarDropdownMenuLink"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span className="coloring">
          <PersonOutlineIcon />
          <span className="navbar-icon-title">{user.name}</span>
          </span>
         
        </a>
        <div className="dropdown-menu bg-0" aria-labelledby="navbarDropdownMenuLink">
       {user&&user.role==="subscriber" && <>  <a className="dropdown-item" href="/user/history">
            Your Profile
          </a>
          <a className="dropdown-item" href="/">
            Your Orders
          </a></>}
          <a className="dropdown-item" onClick={handleClick} >
            Log Out
          </a>
        </div>
      </li>
    );

}

export default DropDown
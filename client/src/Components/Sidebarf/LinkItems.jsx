import React from "react";
import { Link } from 'react-router-dom'
import {useHistory} from "react-router-dom"

function LinkItems(props) {

  const history=useHistory()

  const path=window.location.pathname
function  handleClick(){
   history.push(props.linkpath)
  }

  return (
    <>
      <li onClick={handleClick} className={path===props.linkpath?"link-active":""}>
        <Link to={props.linkpath}>{props.linkname}</Link>
      </li>
    </>
  );
}

export default LinkItems;

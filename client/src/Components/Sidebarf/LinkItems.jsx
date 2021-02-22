import React from "react";
import { Link } from 'react-router-dom'
import {useHistory} from "react-router-dom"

function LinkItems(props) {

  const history=useHistory()
function  handleClick(){
   history.push(props.linkpath)
  }

  return (
    <>
      <li onClick={handleClick}>
        <Link to={props.linkpath}>{props.linkname}</Link>
      </li>
    </>
  );
}

export default LinkItems;

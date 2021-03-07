import React from "react"
import Sidebar from "../../Components/Sidebarf/Sidebar"
import {useSelector} from 'react-redux';



const UserHistory=({history}) =>{
  const {user}=useSelector(state=>({...state}))
    return (
      <div className="user-history">
        <div className=""></div>
          <Sidebar/>
        <p>{user.name}</p>
      </div>
    );
}

 export default  UserHistory;
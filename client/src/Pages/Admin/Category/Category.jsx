import React, { useRef } from 'react'
// import {Link} from "react-router-dom"
import Sidebar from "../../../Components/Sidebarf/Sidebar"
import CreateCategory from './CreateCategory'
import CategoryList from './CategoryList'

const Category = () => {

  const listRef=useRef()

  const rerender=()=>{
      listRef.current.refresh()
      console.log("render called")
  }
  // const listRender=(prev)=>{
  //   console.log("lisRender called")
  // }

 

    return (
        <div className="container-fluid ">
        <div className="row">
          <Sidebar />
          <div className="col-lg-10 col-md-9 d-flex align-items-center flex-column ">
          <CategoryList ref={listRef}/>
          <CreateCategory rerender={rerender}/>
           </div>
         </div>
       </div>
       
    )
}

export default Category

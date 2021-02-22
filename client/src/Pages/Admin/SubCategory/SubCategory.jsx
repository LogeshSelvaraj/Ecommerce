import React from "react";
import "./CreateSubCategory.css"
import Sidebar from "../../../Components/Sidebarf/Sidebar"
import CreateSubCategory from "./CreateSubCategory"



const SubCategory = (props) => {

    return (
        <div className="container-fluid ">
        <div className="row">
          <Sidebar />
          <div className="col-lg-10 col-md-9 d-flex align-items-center flex-column ">
          <CreateSubCategory/>
          
         </div>
       </div>
    </div>
    )

};

export default SubCategory;
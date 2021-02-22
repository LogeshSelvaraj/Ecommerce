import React from 'react'
import Sidebar from '../../../Components/Sidebarf/Sidebar';
import CreateProducts from './CreateProducts';
import "./Product.css"


const Product = () => {
    return (
        <div className="container-fluid ">
        <div className="row">
          <Sidebar />
          <div className="col-lg-10 col-md-9">
            <CreateProducts/>
           </div>
         </div>
       </div>
    )
}

export default Product

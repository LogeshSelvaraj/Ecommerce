import React from 'react'

import Sidebar from '../../../Components/Sidebarf/Sidebar';
import UpdateProduct from './UpdateProduct'


const UpdatePage = ({product}) => {
    return (
        <div className="container-fluid ">
        <div className="row">
          <Sidebar />
          <div className="col-lg-10 col-md-9">
            <UpdateProduct product={product}/>
           </div>
         </div>
       </div>
    )
}

export default UpdatePage

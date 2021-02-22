import React from "react";
import {Switch,Route} from "react-router";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Pages/Auth/Login"
import Register from "./Pages/Auth/Register"
import Home from "./Pages/Home"
import ForgotPassword from "./Pages/Auth/ForgotPassword"
import NavBar from "./Components/NavbarF/Navbar"
import RegisterComplete from "./Pages/Auth/RegisterComplete"
import UserHistory  from "./Pages/User/UserHistory.jsx"
import UserRoute from "./Components/Routes/UserRoute"
import MyOrders from "./Pages/User/MyOrders"
import AdminRoute from './Components/Routes/AdminRoute'
import AdminDashBoard from './Pages/Admin/Dashboard/AdminDashBoard'
import Category from './Pages/Admin/Category/Category'
import SubCategory from './Pages/Admin/SubCategory/SubCategory'
import UpdatePage from './Pages/Admin/Product/UpdatePage'
import  CreatePage from "./Pages/Admin/Product/CreatePage"
import SingleProduct from "./Components/Product/SingleProduct"
import Favicon from 'react-favicon';


import {UpdatingStates} from './functions/UpdatingStates'

function App({history}) {

      UpdatingStates();

  return (
    <>
     <Favicon url="https://res.cloudinary.com/logeshksr99/image/upload/v1613403260/icons8-shopping-bag-30_ogwexq.png"/>
      <NavBar />
      <ToastContainer />
      
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
        <Route exact path="/product/:id" component={SingleProduct} />
        <UserRoute exact path="/user/history" component={UserHistory} />
        <UserRoute exact path="/user/myorders" component={MyOrders} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashBoard}> </AdminRoute>
        <AdminRoute  path="/admin/create-product" component={CreatePage} />
        <AdminRoute exact  path="/admin/category"
               component={Category}/>
        <AdminRoute exact  path="/admin/subcategory" component={SubCategory}/>
        <AdminRoute exact  path="/admin/update-product/:id" component={UpdatePage}/>
      </Switch>
    </>
  );
   
}

export default App;

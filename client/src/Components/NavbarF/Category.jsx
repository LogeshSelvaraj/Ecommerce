import React,{useEffect,useState} from "react";
import CategoryIcon from "@material-ui/icons/Category";
import {getCategories} from '../../functions/CategoryApi'
import {getSubs} from '../../functions/SubCategory'

const Category = () => {

  const [categories,setCategories]=useState()
  const [subs,setSubs]=useState()

  useEffect(()=>{
    loadCategories()
  },[])


  const loadCategories=()=>{
      getCategories().then((res)=>{
        setCategories(res.data)
      })
      getSubs().then(res=>{
        setSubs(res.data)
      })
  }

 

  return (
    <li className="nav-item active ">
      <a className="nav-link navbar-myicon" href="/">
        <div class="dropdown">
          <button
            class="btn dropdown-toggle p-0 border-0"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span className="coloring category-icon ">
              <CategoryIcon />
              <span className="navbar-icon-title">Categories</span>
            </span>
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          {categories&&categories.length&&categories.map(c=>{
            return   <span id={c._id} class="dropdown-item" >
                  {c.name}
            </span>
          })}
          
        
          </div>
        </div>
      </a>
    </li>
  );
};

export default Category;

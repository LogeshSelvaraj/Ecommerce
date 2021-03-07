import React, { useEffect, useState } from "react";
import {useHistory} from 'react-router';
import CategoryIcon from "@material-ui/icons/Category";
import { getCategories } from "../../functions/CategoryApi";
import { getSubs } from "../../functions/SubCategory";
import "./Category.css"

const Category = () => {
  const [categories, setCategories] = useState();
  const [subs, setSubs] = useState();
  const history=useHistory()

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    getCategories().then((res) => {
      setCategories(res.data);
    });
    getSubs().then((res) => {
      setSubs(res.data);
    });
  };

  const checkForSubs = (c) => {
    let count = 0;
    subs.map((s) => {
      s.category === c._id && count++;
    });
    if (count > 0) {
      const match = subs.filter((s) => s.category === c._id);
      return (
        <>
          <div  className="dropdown-submenu" >
            <a id={c._id} className="dropdown-item" tabIndex="-1" onClick={handleCategory} href="#">{c.name}</a>
            <ul className="dropdown-menu">
              {match.map((m,index) =>{
                return (
                <li key={index}>
                   <a  id={m._id} onClick={handleSubs} href="#" className="dropdown-item" key={index}> {m.name}</a>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      );
    }
    return <a id={c._id} key="No-child" className="dropdown-item" onClick={handleCategory} href="#">{c.name}</a>
  };


  const handleCategory=(e)=>{
    e.preventDefault()
    const cat=categories.filter(c=>c._id===e.target.id)
    console.log(cat)
    history.push(`/category/${e.target.id}/${cat[0].name}`)
  }

  const handleSubs=(e)=>{
    e.preventDefault()
    const cat=subs.filter(c=>c._id===e.target.id)
    console.log(cat)
    history.push(`/subcategory/${e.target.id}/${cat[0].name}`)
    window.location.reload()
  }

  return (
    <li className="nav-item active ">
      <div className="nav-link navbar-myicon" href="#">
        <div className="dropdown">
          <button
            className="btn dropdown-toggle p-0 border-0"
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
          <div className="dropdown-menu multi-level" aria-labelledby="dropdownMenuButton">
            {categories &&
              categories.length &&
              categories.map((c) => {
                return subs && subs.length && checkForSubs(c);
              })}
          </div>
        </div>
      </div>
    </li>
  );
};

export default Category;

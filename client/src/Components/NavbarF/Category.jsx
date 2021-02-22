import React from "react";
import CategoryIcon from "@material-ui/icons/Category";

const Category = () => {
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
            <a class="dropdown-item" href="#">
              Action
            </a>
            <a class="dropdown-item" href="#">
              Another action
            </a>
            <a class="dropdown-item" href="#">
              Something else here
            </a>
          </div>
        </div>
      </a>
    </li>
  );
};

export default Category;

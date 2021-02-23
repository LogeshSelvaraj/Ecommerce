import React from "react";
import NavBarLeftItems from "./NavLeftItems"
import NavBarRightItems from "./NavRightItems"
import "./Navbar.css"



function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand navbar-myicon" href="/">
          Adiat
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <NavBarLeftItems/>
        <NavBarRightItems/>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

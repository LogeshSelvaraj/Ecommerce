import React from "react";
import LinkItems from "./LinkItems";
import { useSelector } from "react-redux";
import "./sidebar.css";

const Sidebar = () => {
  const { sidebarLink } = useSelector((state) => ({ ...state }));


  return (
    <div id="admin-sidebar" className="col-lg-2 col-md-3">
      <ul className="admin-sidenav list-unstyled">
        {sidebarLink.map((props,index) => {
          return <LinkItems key={index} linkpath={props.path} linkname={props.name} />;
        })}
      </ul>
    </div>
  );
};

export default Sidebar;

import React from "react";
import "./SidebarOptions.css"
import { Link } from "react-router-dom";

function SidebarOptions({Icon, name, path}){
    return(
        <Link to={path} className = "sidebarOptions">
            <Icon />
            <h2>{name}</h2>
        </Link>
    );
}

export default SidebarOptions;
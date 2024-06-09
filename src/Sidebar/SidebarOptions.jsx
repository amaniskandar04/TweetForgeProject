import React from "react";
import "./SidebarOptions.css"
import { Link, useNavigate } from "react-router-dom";

function SidebarOptions({Icon, name, path, logout}){

    const navigate = useNavigate();
    

    const handleLogout = () =>{
        if(logout === true){
            localStorage.removeItem('token');
            
            navigate(path);
        }
    }
    
    return(

        <Link to={path} className = "sidebarOptions" onClick={logout == true ? handleLogout : null}>
            <Icon />
            <h2>{name}</h2>
        </Link>
    );
}

export default SidebarOptions;
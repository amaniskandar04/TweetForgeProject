import React from "react";
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import "./Sidebar.css";
import CottageIcon from '@mui/icons-material/Cottage';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';

import SidebarOptions from './SidebarOptions.jsx';


function Sidebar(){
    return(
        <>
            <div className= "sidebar">
                <br></br> <br></br> <br></br>
                <SidebarOptions Icon ={CottageIcon} name = "Home" path = "/home" />
                <SidebarOptions Icon ={SettingsApplicationsIcon} name = "Settings" />
                <SidebarOptions Icon ={SearchIcon} name = "Search" />
                <SidebarOptions Icon ={EditIcon} name = "Tweet" />
                <SidebarOptions Icon ={ExitToAppIcon} name = "Logout" path = "/login" />
            </div>
        </>
    );
}

export default Sidebar;
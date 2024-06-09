import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import "./Sidebar.css";
import CottageIcon from '@mui/icons-material/Cottage';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';
import logo from '../assets/logo.png'
import { Avatar } from "@mui/material";
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';

import SidebarOptions from './SidebarOptions.jsx';


function Sidebar(){


    const userData = localStorage.getItem('userData');
    let user = null;
    try {
        user = userData ? JSON.parse(userData) : null;
        console.log(user.username);
    } catch (error) {
        console.error('Error parsing userData from localStorage:', error);
    }
    
    
    return(
        <>
            <div className= "sidebar">
                
                <div className = "epc">
                    <div className = "logo__container">
                        <img className = 'logo' style={{ width: '50px', height: '50px' }} src = {logo}></img>
                        <h2>TweetForge</h2>
                    </div>
                    <SidebarOptions Icon ={CottageIcon} name = "Home" path = "/home" />
                    
                    
                    <SidebarOptions Icon ={SearchIcon} name = "Search" path="/search" />
                    <SidebarOptions Icon ={EditIcon} name = "Tweet" />
                    {user && user.username ? (
                        <SidebarOptions Icon={PersonIcon} name="Profile" path={`/${user.username}`} />
                    ) : (
                        <SidebarOptions Icon={PersonIcon} name="Profile" path="/profile" />
                    )}
                    <SidebarOptions Icon ={SettingsApplicationsIcon} name = "Settings"  path = "/settings"/>
                    <SidebarOptions Icon ={ExitToAppIcon} name = "Logout" path = "/login" logout ={true}/>
                </div>
                <div  className = "lower__container">
                    <Avatar src='' style={{ marginRight: '1rem' }} />
                    <h2>@{user.username}</h2>
                </div>
            </div>
        </>
    );
}

export default Sidebar;
import React, { useEffect } from 'react';


import Sidebar from '../Sidebar/Sidebar.jsx';
import SettingFeed from './SettingFeed.jsx';
import Widget from '../Homescreen/Widget.jsx';
import '../index.css';


function Homescreen() {
  
  
  return(
    <>
      <div className = "homescreen">
        <Sidebar />
        
        <SettingFeed/>
        <Widget />
      </div>
    </>
  );
}

export default Homescreen;
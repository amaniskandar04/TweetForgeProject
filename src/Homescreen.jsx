import React, { useEffect } from 'react';


import Sidebar from './Sidebar.jsx';
import Feed from './Feed.jsx';
import Widget from './Widget.jsx';
import './index.css';


function Homescreen() {
  
  
  return(
    <>
      <div className = "homescreen">
        <Sidebar />
        <Feed />
        <Widget />
      </div>
    </>
  );
}

export default Homescreen;
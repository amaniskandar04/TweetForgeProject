import React, { useEffect } from 'react';


import Sidebar from '../Sidebar/Sidebar.jsx';
import Feed from './Feed.jsx';
import Widget from './Widget.jsx';
import '../index.css';
import SinglePost from './SinglePost.jsx';


function Homescreen() {
  
  
  return(
    <>
      <div className = "homescreen">
        <Sidebar />
        
        <Feed></Feed>
        <Widget />
      </div>
    </>
  );
}

export default Homescreen;
import React, { useEffect } from 'react';


import Sidebar from '../Sidebar/Sidebar.jsx';
import ProfileFeed from './ProfileFeed.jsx';
import Widget from '../Homescreen/Widget.jsx';
import '../index.css';



function Profile() {
  
  
  return(
    <>
      <div className = "homescreen">
        <Sidebar />
        
        <ProfileFeed />
        <Widget />
      </div>
    </>
  );
}

export default Profile;
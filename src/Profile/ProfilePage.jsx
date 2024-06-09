import React, { useEffect } from 'react';


import Sidebar from '../Sidebar/Sidebar.jsx';

import Widget from '../Homescreen/Widget.jsx';
import Profile from './Profile.jsx';



function ProfilePage() {
  
  
  return(
    <>
      <div className = "homescreen">
        
        <Profile></Profile>
        
      </div>
    </>
  );
}

export default ProfilePage;
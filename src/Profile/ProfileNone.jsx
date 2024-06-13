import React, { useEffect } from 'react';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';


import Sidebar from '../Sidebar/Sidebar.jsx';
import ProfileFeed from './ProfileFeed.jsx';
import Widget from '../Homescreen/Widget.jsx';
import image from '../assets/image.png'
import './ProfileNone.css';





function ProfileNone() {


  return (
    <>

      <div className="notfound">

        <div className="notfoundentity">
          <NoAccountsIcon  style={{ fontSize: '4rem', width: '100px', height: '100px'}}/>
          {/* <img src={image}></img> */}
          <h1>NO PROFILE</h1>
          <p>We cannot find the profile. Please make sure you have the right profile.</p>

        </div>
      </div>

    </>
  );
}

export default ProfileNone;
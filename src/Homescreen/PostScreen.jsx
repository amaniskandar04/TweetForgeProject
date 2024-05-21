import React, { useEffect } from 'react';

import { useLocation } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar.jsx';
import Feed from './Feed.jsx';
import Widget from './Widget.jsx';
import SinglePost from './SinglePost.jsx';
import '../index.css';


function PostScreen() {
  
    const location = useLocation();
    const { username, text, tags } = location.state || {};
    
  return(
    <>
      <div className = "homescreen">
        <Sidebar />
        
        <SinglePost></SinglePost>
        <Widget />
      </div>
    </>
  );
}

export default PostScreen;
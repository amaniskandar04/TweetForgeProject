import React, { useEffect } from 'react';


import Sidebar from '../Sidebar/Sidebar.jsx';
import SearchFeed from './SearchFeed.jsx';
import Widget from '../Homescreen/Widget.jsx';
import '../index.css';



function Search() {
  
  
  return(
    <>
      <div className = "homescreen">
        <Sidebar />
        
        <SearchFeed />
        <Widget />
      </div>
    </>
  );
}

export default Search;
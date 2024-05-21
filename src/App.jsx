import React, { useEffect } from 'react';

import Homescreen from './Homescreen/Homescreen.jsx';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Login from './Login/Login.jsx';
import Registration from './Registration/Registration.jsx';
import PostScreen from './Homescreen/PostScreen.jsx'
import './index.css';


function App() {
  useEffect(() => {

    document.title = 'TweetForge'; 
  }, []);
  
  return(
    <Router>
      <div>
        <Routes>
          <Route path="/home" element={<Homescreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/post" element={<PostScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App

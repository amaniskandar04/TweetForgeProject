import React, { useEffect } from 'react';

import Homescreen from './Homescreen.jsx';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Login from './Login';
import Registration from './Registration';
import './index.css';


function App() {
  useEffect(() => {

    document.title = 'TweetForge'; 
  }, []);
  
  return(
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Homescreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App

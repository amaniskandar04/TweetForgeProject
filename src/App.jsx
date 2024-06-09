import React, { useEffect } from 'react';

import Homescreen from './Homescreen/Homescreen.jsx';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import Login from './Login/Login.jsx';
import Registration from './Registration/Registration.jsx';
import PostScreen from './Homescreen/PostScreen.jsx'
import ProfileBox from './Profile/ProfileBox.jsx';
import ProfileFeed from './Profile/ProfileFeed.jsx';
import Profile from './Profile/Profile.jsx';
import Settings from './Settings/Settings.jsx'

import './index.css';
import ProfilePage from './Profile/ProfilePage.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import PublicRoute from './PublicRoute.jsx';
import Menu from './Menu.jsx';
import Search from './Searchbar/Search.jsx';

function App() {
  useEffect(() => {

    document.title = 'TweetForge';
  }, []);


  return (
    <Router>
      <div>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/" element={<Menu />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
          </Route>


          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Homescreen />} />
            <Route path="/comments/:id" element={<PostScreen />} />
            <Route path="/:id" element={<Profile />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/search" element={<Search />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App

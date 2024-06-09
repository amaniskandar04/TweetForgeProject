import './SettingFeed.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Avatar, Button } from '@mui/material';

function SettingFeed(){
    
    return(
        <div className='profile'>
            <div className='profile__header'>
                <h2>Settings</h2>
            </div>

            <form className = "info">
                <Avatar className='avatar' sx={{
                    width: 150,
                    height: 150,
                    '& img': {
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                    },
                }} >
                    <img alt="sigma" />
                </Avatar>

                <h2>Username</h2>
                <input></input>

                <h2>Password</h2>
                <input></input>

                <h2>Title</h2>
                <input></input>

                <h2>Description</h2>
                <textarea></textarea>

                <br></br>
                <br></br>
                
                <div className = "button_container">
                    <button className = "butang">Submit</button>
                    <button className = "butang">Cancel</button>
                </div>
           
                
                
                
            </form>
            
            


        </div>
    );
}

export default SettingFeed
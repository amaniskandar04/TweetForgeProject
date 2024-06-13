import './SettingFeed.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Avatar, Button } from '@mui/material';

function SettingFeed() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [profilePicturePreview, setProfilePicturePreview] = useState(null);
    const [userId, setUserId] = useState(''); // Assume you set this from your user context or state

    useEffect(() => {
        const fetchProfilePicture = async () => {
            try {
                const user = localStorage.getItem('userData');
                const userData = JSON.parse(user);
                setUserId(userData.id);

                if (userId) {
                    const response = await axios.get(`http://localhost:8080/TweetForge/${userId}/userPic`, { responseType: 'blob' });
                    if (response.status === 200) {
                        const imageUrl = URL.createObjectURL(response.data);
                        console.log(imageUrl);
                        setProfilePicturePreview(imageUrl);
                    }else{
                        console.log("SOMETHING WRONG WHEN FETCHING PROFILE PIC")
                    }
                }
            } catch (error) {
                console.error('Error fetching profile picture:', error);
            }
        };

        fetchProfilePicture();
    }, [userId]);


    const handleSetTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleSetDescription = (e) => {
        setDescription(e.target.value);

    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Create form data
            const formData = new FormData();
            formData.append('userId', userId);

            // Upload profile picture if available
            if (profilePicture) {
                formData.append('imageFile', profilePicture);
                // Send form data to the server (Update profile picture)
                const profilePicResponse = await axios.post('http://localhost:8080/TweetForge/setUserPic', formData);
                console.log(profilePicResponse.data);
            }

            // Update the Title
            if (title.length !== 0) {
                const titleResponse = await axios.post(`http://localhost:8080/TweetForge/${userId}/setTitle`, { title });
                console.log("title: " + titleResponse.data);
            }

            // Update the Description
            if (description.length !== 0) {
                const descriptionResponse = await axios.post(`http://localhost:8080/TweetForge/${userId}/setDescription`, { description });
                console.log("description: " + descriptionResponse.data);
            }
        } catch (error) {
            console.error('Error handling form submission:', error);
        }
    }

    const handleCancel = (event) => {
        event.preventDefault();
        setTitle('');
        setDescription('');
    }


    const handleChangeProfilePictureClick = () => {
        document.getElementById('profilePictureInput').click();
    }
    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log(file);
            setProfilePicture(file);
            setProfilePicturePreview(URL.createObjectURL(file));
        }
    }

    return (
        <div className='profile'>
            <div className='profile__header'>
                <h2>Settings</h2>
            </div>

            <form className="info" onSubmit={handleSubmit}>
                <Avatar
                    className='avatar'
                    sx={{
                        width: 150,
                        height: 150,
                        '& img': {
                            objectFit: 'cover',
                            width: '100%',
                            height: '100%',
                        },
                    }}
                    onClick={handleChangeProfilePictureClick}
                    src={profilePicturePreview}
                />

                <input
                    id="profilePictureInput"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleProfilePictureChange}
                />

                {/* <h2>Username</h2>
                <input></input> */}


                <h2>Title</h2>
                <textarea value={title} onChange={handleSetTitle} />

                <h2>Description</h2>
                <textarea value={description} onChange={handleSetDescription} />

                <br></br>
                <br></br>

                <div className="button_container">

                    <button className="butang" onClick={handleCancel} >Cancel</button>
                    <button className="butang" type="submit">Submit</button>
                </div>




            </form>




        </div>
    );
}

export default SettingFeed
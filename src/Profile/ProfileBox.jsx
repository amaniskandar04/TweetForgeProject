import { Description } from '@mui/icons-material';
import './ProfileBox.css'
import { Avatar, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileNone from './ProfileNone';



//this is the profilebox, where I manipulate the code for user profile

function ProfileBox({ setActiveButton, activeButton, setProfileExist }) {
    const { id } = useParams(); // Access the :id part of the URL
    // id will contain the value from the URL, e.g., 'abu' from '/abu'
    const [profilePicturePreview, setProfilePicturePreview] = useState(null);
    const [userId, setUserId] = useState(''); 

    const hardcodedProfile = {
        izzhan: { name: 'izzhan', email: 'sigma', password: "ohio" }
    };


    const [userProfile, setUserProfile] = useState({ hardcodedProfile });




    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/TweetForge/getAllUsers');

                if (response.status === 200) {

                    const userData = response.data;
                    
                    const updatedProfiles = {};
                    userData.forEach(user => {
                        updatedProfiles[user.username] = {
                            name: user.username,
                            email: user.email,
                            password: user.password,
                            tweets: user.tweets,
                            title: user.title,
                            description: user.description,
                            // Add other properties from user data as needed
                        };
                    });

                    setUserProfile(prevProfile => ({
                        ...prevProfile,
                        ...updatedProfiles,
                    }));

                } else {
                    // Handle unsuccessful response
                    console.log('Failed to fetch users');
                }
            } catch (error) {
                // Handle error
                console.error('Error:', error);
            }
        };

        fetchUserData(); // Fetch user data when component mounts

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





    const profile = userProfile[id]; // Look up the profile by the id

    useEffect(() => {
        if (!profile) {
            setProfileExist(false);
        } else {
            setProfileExist(true);
        }
        console.log(profile)
    }, [profile, setProfileExist]);

    if (!profile) {
        return <ProfileNone />;
    }

    

    return (
        <>
            <div className='profile__box'>
                <Avatar className='avatar' sx={{
                    width: 150,
                    height: 150,
                    '& img': {
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                    },
                }} >
                    <img src={profilePicturePreview} alt="sigma" />
                </Avatar>
                <div className='description'>
                    <h2>{profile.name}</h2>
                    {profile.title ? (<h3>{profile.title}</h3>) : (<h3>Default Title</h3>)}
                    {profile.description ? (<p>{profile.description}</p>) : (<p>Default Description</p>)}
                    
                </div>
            </div>

            <div className='profile__footer'>
                <button
                    className={`button ${activeButton === 0 ? 'active' : ''}`}
                    onClick={() => setActiveButton(0)}
                >
                    Posts
                </button>
                <button
                    className={`button ${activeButton === 1 ? 'active' : ''}`}
                    onClick={() => setActiveButton(1)}
                >
                    Comments
                </button>
            </div>
        </>

    )
}

export default ProfileBox


// izzhan: { name: 'izzhan', age: 70, bio: 'Child Rapper', Description: 'I wonder what else is hard than my rod when seeing kids' , image: 'public/img/izzhan.jpg'},
//         sayyid: { name: 'Sayyid Syamil Syed Mohamed', age: 10, bio: 'MILF HUNTER', Description: "Your favourite momma's lover" ,image: 'public/img/sayyid.jpg' },
//         aman: { name: 'Aman Iskandar Mohamad Dzulhaidi', age: 10, bio: 'Love to watch kids play', Description: "Don't mind me, I am just looking at the kids in the park to ensure their safety (I already kidnapped 10 kids)" ,image: 'public/img/aman.jpg' },
//         hafiz: { name: 'Hafiz Adha bin Mohd Azahari', age: 10, bio: '[Certified Child Groomer][Able to pull the 10 (years old)]', Description: "Throughout my life, I've always had a dream to become a groomer, now that I am working full time as edger and groomer. I couldn't thank god enough for this achievement. " ,image: 'public/img/hafiz.jpg' }
//         // Add more user profiles here as needed
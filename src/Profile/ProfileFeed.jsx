import './ProfileFeed.css'
import Box from '../Homescreen/Box.jsx';
import ProfileBox from './ProfileBox.jsx'
import Post from '../Post/Post.jsx'
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProfileFeed(){
    const [posts, setPosts] = useState([]);
    const { id } = useParams();
    const [activeButton, setActiveButton] = useState(0); 
    const navigate = useNavigate();

    const addPost = (username, text, tags) => {
        const newPost = {
            username,
            text,
            tags,
        };

        setPosts([newPost, ...posts]);
    };

    

    //tukar comment kat sini

    const handleClick = (post) =>{

        navigate('/comments/:id', { state: { username: post.username, text: post.text, tags: post.tags } });
    }

    const fetchPosts = async () => {
        const user = { username: id };
        try {
            const response = await axios.post('http://localhost:8080/tweets/getAllPersonalTweets', user);
            if (response.status === 200) {
                setPosts(response.data);
            } else {
                console.log('Failed to fetch posts');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchComments = async () => {
        const user = { username: id };
        try {
            const response = await axios.post('http://localhost:8080/tweets/getAllPersonalComments', user);
            if (response.status === 200) {
                setPosts(response.data);
            } else {
                console.log('Failed to fetch comments');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        if (activeButton === 0) {
            fetchPosts();
        } else {
            fetchComments();
        }
        console.log("Profile page: " + id);
    }, [activeButton]);

    const deletePost = (tweetId) => {
        
        

        setPosts(posts.filter(post => post.tweetId !== tweetId));
    };


    return(
        <div className = 'profile'>
            <div className = 'profile__header'>
                <ArrowBackIcon />
                <h2> Profile Name </h2>              
            </div>

            <ProfileBox setActiveButton={setActiveButton} activeButton={activeButton} />

            
            {posts.map((post, index) => (
                <Post key={index} userId = {post.userId} username={id} text={post.content+' '+post.hashtags} onClick={()=> handleClick(post)} deletePost={deletePost}/>
            ))}   

                  
            
        </div>
    );
}

export default ProfileFeed
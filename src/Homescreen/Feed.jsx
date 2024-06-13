import './Feed.css'
import Box from './Box.jsx'
import Tweetbox from '../Tweetbox/Tweetbox.jsx'
import Post from '../Post/Post.jsx'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { colors } from '@mui/material';
import { red } from '@mui/material/colors';
import axios from 'axios';
import LoadingBarReal from './LoadingBarReal.jsx';

// import Box from '@mui/material/Box';



function Feed(){
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const navigate = useNavigate();

    
    const addPost = (username, text, tags, likeUserIds) => {
        const userData = localStorage.getItem('userData');
        let user = null;
        try {
            user = userData ? JSON.parse(userData) : null;
            console.log(user.username);
        } catch (error) {
            console.error('Error parsing userData from localStorage:', error);
        }
        console.log(userData);
        const newPost = {
            id: (posts.length + 1).toString().padStart(2, '0'),
            userId: user ? user.id : 'unknown',
            username: user ? user.username : 'loading...',
            content: text +' '+tags|| 'loading...',
            likeUserIds,
            // id: (posts.length + 1).toString().padStart(2, '0'),
            // userId: 'Loading...',
            // username: 'loading...',
            // content: 'loading...',
            // likeUserIds,
        };
        
        setPosts([newPost,...posts]);
        fetchTweetData();
    };

    
    //when clicking on a post
    const handleClick = (post) =>{
        
        
        const numOflikes = numberOfLikes(post);
        navigate(`/comments/${post.tweetId}`, { state: { userId :post.userId,username: post.username, text: post.content, tags: post.hashtags, numOflikes, statusDelete: post.statusDelete} });
    }

    //fetch data from mongodb
    const fetchTweetData = async () => {
        const userData = localStorage.getItem('userData');
        let user = null;
        try {
            user = userData ? JSON.parse(userData) : null;
            console.log(user.username);
        } catch (error) {
            console.error('Error parsing userData from localStorage:', error);
        }
        try {
            console.log(user);
            const response = await axios.post(`http://localhost:8080/recTweets/upload`, user);

            if (response.status === 200) {
                setIsLoading(false);
                const tweetData = response.data;
                
                setPosts(tweetData)
                console.log("Data: ")
            } else {
                // Handle unsuccessful response
                console.log('Failed to fetch tweet');
            }
        } catch (error) {
            // Handle error
            console.error('Error:', error);
        }
    };



    useEffect(() => {
        //how to add loading bar here
        setIsLoading(true);

        fetchTweetData(); // Fetch user data when component mounts
        
    }, []);

    const deletePost = (tweetId) => {
        
        

        setPosts(posts.filter(post => post.tweetId !== tweetId));
    };

    const numberOfLikes = (post) => {
        return Array.isArray(post.likeUserIds) ? post.likeUserIds.length : 0;
    }

    return(
        <div className="feed">
            <div className = 'feed__header'>
                <h2> TweetForge </h2>              
            </div>
            
            <Tweetbox addPost={addPost}/>

            {isLoading ? (
                <LoadingBarReal />
            ) : (
                // Render posts if isLoading is false
                posts.map((post) => (
                    <Post
                        key={post.tweetId}
                        userId={post.userId}
                        tweetId={post.tweetId}
                        username={post.username}
                        text={post.content + (Array.isArray(post.hashtags) ? ' ' + post.hashtags.join(' ') : '')}
                        numOflikes={numberOfLikes(post)}
                        onClick={() => handleClick(post)}
                        deletePost={deletePost}
                    />
                ))
            )}
        </div>
    );
}

export default Feed


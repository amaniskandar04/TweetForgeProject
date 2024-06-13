import React, { useState, useEffect } from "react";
import "./Post.css"
import { Avatar } from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
import QuickreplyIcon from '@mui/icons-material/Quickreply';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';


function Post({ tweetId, userId, username, text, numOflikes, onClick, deletePost , isComment , imageUrl}) {

    const [likes, setLikes] = useState(numOflikes);
    const [likedByUser, setLikedByUser] = useState(false);
    const [comment, setComments] = useState(0);
    const [user, setUser] = useState(null); 

    useEffect(() => {
        // Check if the user has liked the post
        const userData = localStorage.getItem('userData');
        try {
            const parsedUserData = userData ? JSON.parse(userData) : null;
            if (parsedUserData) {
                setUser(parsedUserData);
                checkIfLikedByUser(parsedUserData.id);
            }
        } catch (error) {
            console.error('Error parsing userData from localStorage:', error);
        }
    }, []);

    const checkIfLikedByUser = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:8080/tweets/${tweetId}/isLikedByUser/${userId}`);
            if (response.status === 200) {
                console.log(response.data)
                setLikedByUser(response.data);
            }
        } catch (error) {
            console.error('Error checking if post is liked by user:', error);
        }
    };


    const handleLikeClick = async (event) => {
        event.stopPropagation(); // Prevents the onClick event from bubbling up
        //code to update to the database
        
        const likeEndpoint = isComment ? `http://localhost:8080/tweets/${tweetId}/likeComment` : `http://localhost:8080/tweets/${tweetId}/like`;
        const unlikeEndpoint = isComment ? `http://localhost:8080/tweets/${tweetId}/unlikeComment` : `http://localhost:8080/tweets/${tweetId}/unlike`;
        

        try {
            if (likedByUser) {
                await axios.post(unlikeEndpoint, { userId: user.id });
                setLikes(likes - 1);
                setLikedByUser(false);
            } else {
                await axios.post(likeEndpoint, { userId: user.id });
                setLikes(likes + 1);
                setLikedByUser(true);
            }
            
        } catch (error) {
            console.error('Error liking/unliking the post:', error);
        }
    };

    const handleCommentClick = (event) => {
        event.stopPropagation(); // Prevents the onClick event from bubbling up
        console.log("stfu");
    };

    const handleDeletePost = async (event) => {
        event.stopPropagation();
        
        
        if(user.id === userId){
            console.log("SUCCESS: "+user.id)
            try {

                const endpoint = isComment ? `http://localhost:8080/tweets/comment/${tweetId}` : `http://localhost:8080/tweets/${tweetId}`;
                const response = await axios.put(endpoint);
    
                if (response.status === 200) {
                    console.log("TweetId: " + tweetId);
                    console.log(response.data)
                    console.log("OMG U DELETED UR POST")
                    //code to remvoe this post from posts
                    deletePost(tweetId);
    
                } else {
                    // Handle unsuccessful response
                    console.log('Failed to fetch tweet');
                }
            } catch (error) {
                // Handle error
                console.error('Error:', error);
            }
        }else{
            console.log("Brother you don't own that post!")
        }

        
    }


    return (
        <div className='post' onClick={onClick} >
            <div className="post__avatar">
                <Avatar src={imageUrl} />
            </div>
            <div className="post__body">
                <div className="post__header" >
                    <div className="post__header__text">
                        <h3>{username}</h3>
                    </div>
                    <div className="post__text">
                        <p>{text}</p>
                    </div>
                </div>
                <div className="post__footer">

                    <div className='likecomment'>
                        <button className = 'epico' onClick={handleCommentClick}>
                            <CommentIcon fontSize="small" style={{ color: "gray" }} />
                        </button>

                    
                    </div>

                    <div className='likecomment'>
                        <button className = 'epico' onClick={handleLikeClick}>
                            {likedByUser ? <ThumbUpAltIcon fontSize='small' style={{ color: "rgb(0, 128, 208)" }} /> : <ThumbUpOffAltIcon fontSize='small' style={{ color: "gray" }} />}
                        </button>

                        <p>{likes}</p>
                    </div>

                    {user && user.id === userId && (
                        <div  className='likecomment'>
                            <button className = 'epico' onClick={handleDeletePost}>
                                <DeleteIcon style={{ color: "gray" }}/>
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default Post;
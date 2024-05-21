import React, { useState } from "react";
import "./Post.css"
import { Avatar } from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
import QuickreplyIcon from '@mui/icons-material/Quickreply';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

function Post({username,text,onClick})
{

    const [likes, setLikes] = useState(0);
    const [comment, setComments] = useState('');

    return(
        <div className = 'post' onClick={onClick}>
            <div className="post__avatar">
                <Avatar src = '' />
            </div>
            <div className="post__body">
                <div className="post__header">
                    <div className="post__header__text">
                        <h3>@{username}</h3>
                    </div>
                    <div className="post__text">
                    <p>{text}</p>
                    </div>
                </div>
                <div className="post__footer">

                    <div className = 'likecomment'>
                        <button onClick={() => console.log("stfu")}>
                        <CommentIcon fontSize = "small"/>
                        </button>
                        
                        <p>66666</p>
                    </div>

                    <div className = 'likecomment'>
                        <button onClick={() => setLikes(likes+1)}>
                        <ThumbUpOffAltIcon fontSize = 'small'/>
                        </button>
                        
                        <p>{likes}</p>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default Post;
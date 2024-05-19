import React from "react";
import "./Post.css"
import { Avatar } from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
import QuickreplyIcon from '@mui/icons-material/Quickreply';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

function Post({
    username,
    text,
}){
    return(
        <div className = 'post'>
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
                        <CommentIcon fontSize = "small"/>
                        <p>66666</p>
                    </div>
                    <div className = 'likecomment'>
                        <ThumbUpOffAltIcon fontSize = 'small'/>
                        <p>6656663456</p>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default Post;
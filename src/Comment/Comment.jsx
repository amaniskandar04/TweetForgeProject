import React, { useState } from "react";
import "./Tweetbox.css"
import {Avatar, Button} from '@mui/material';

function Comment({addTweet}){

    const [tweet, setTweet] = useState('');
    const [tags, setTags] = useState('');


    const handleComment = (e) => {
        e.preventDefault();
        const username = "abdullahi";
        console.log(tweet)
        console.log(tags)
        addTweet(username, tweet, tags);
        setTweet("")
        setTags("")
    }
    
    return(
        <div className = 'tweetBox'>
            <form onSubmit={handleComment}> 
                <div className = 'tweetbox_input'>
                    <Avatar src = ''/>
                    <input
                        type="text"
                        placeholder="Add a comment"
                        value = {tweet}
                        onChange={(e) => setTweet(e.target.value)}
                    />

                    <br></br>
                    
                </div>
                <input className = 'input_hashtag'
                    type="text"
                    placeholder="Type your hashtags"
                    value = {tags}
                    onChange={(e) => setTags(e.target.value)}
                />
                <div className="butang-position">
                    <Button className = 'butang' type="submit"> Tweet </Button>
                </div>
                
            </form>
        </div>
    );
}

export default Comment;
import React, { useState } from "react";
import "./Tweetbox.css"
import {Avatar, Button} from '@mui/material';

function Tweetbox({addPost}){

    const [tweet, setTweet] = useState('');
    const [tags, setTags] = useState('');


    const handleTweet = (e) => {
        e.preventDefault();
        const username = "abdullahi";
        console.log(tweet)
        console.log(tags)
        addPost(username, tweet, tags);
        setTweet("")
        setTags("")
    }

    //algorithm when submit, take the username, tweet and tags, 
    return(
        <div className = 'tweetBox'>
            <form onSubmit={handleTweet}> 
                <div className = 'tweetbox_input'>
                    <Avatar src = ''/>
                    <input
                        type="text"
                        placeholder="Type your tweet here:"
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

export default Tweetbox;
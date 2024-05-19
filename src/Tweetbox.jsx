import React from "react";
import "./Tweetbox.css"
import {Avatar, Button} from '@mui/material';

function Tweetbox(){
    return(
        <div className = 'tweetBox'>
            <form>
                <div className = 'tweetbox_input'>
                    <Avatar src = ''/>
                    <input
                        type="text"
                        placeholder="Type your tweet here:"
                    />

                    <br></br>
                    
                </div>
                <input className = 'input_hashtag'
                    type="text"
                    placeholder="Type your hashtags"
                />
                <Button className = 'butang'> Tweet the epic </Button>
            </form>
        </div>
    );
}

export default Tweetbox;
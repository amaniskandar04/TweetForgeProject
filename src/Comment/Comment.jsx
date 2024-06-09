import React, { useState } from "react";
import "./Tweetbox.css"
import {Avatar, Button} from '@mui/material';
import axios from "axios";
import { useParams } from "react-router-dom";
import predefinedHashtags from "./hashtags.json";

function Comment({addTweet}){

    const [tweet, setTweet] = useState('');
    const [tags, setTags] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const {id} = useParams(); //getting the id from the url
    

    const handleComment = async (e) => {
        e.preventDefault();

        if (!tweet.trim()) {
            setErrorMessage('Comment content is required');
            return;
        }

        const userData = localStorage.getItem('userData');
        let user = null;
        try {
            user = userData ? JSON.parse(userData) : null;
            console.log(user.username);
        } catch (error) {
            console.error('Error parsing userData from localStorage:', error);
        }
       
        const username = user.username;
        
        const tagArray = tags.split(" ").filter(tag => tag.trim() !== "");
        const postTweet = {content: tweet,userId: user.id, parentId: id,hashtags:tagArray};
        
        // send the comment to the database
        try {
            console.log(postTweet)
            const response = await axios.post(`http://localhost:8080/tweets/addComment`, postTweet, {
                headers: {
                    'Content-Type': 'application/json',
                },  
            });

            if (response.status === 200) {
                console.log("tweet added!")
                
            } else {
                // Handle registration failure (e.g., show an error message)
                console.log('???');
            }
        } catch (error) {
            console.log("you failed")
            console.error('Error:', error);
        }
        console.log("Path: "+id);
        console.log("NIGGA")
        console.log(tags)
        addTweet(username, tweet, tags);
        setTweet("")
        setTags("")
        setErrorMessage('');
    }

    const handleTagChange = (e) => {
        const value = e.target.value;
        setTags(value);

        // Extract the current hashtag being typed
        const currentTag = value.split(" ").pop();

        if (currentTag.startsWith("#")) {
            const filteredSuggestions = predefinedHashtags.filter(tag =>
                tag.startsWith(currentTag) && tag !== currentTag
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    }

    const addSuggestion = (suggestion) => {
        const words = tags.split(" ");
        words.pop(); // Remove the current incomplete hashtag
        const newTags = [...words, suggestion].join(" ");
        setTags(newTags + " ");
        setSuggestions([]);
    }
    
    return(
        <div className='tweetBox'>
            {/* change data here brother v */}
            <form onSubmit={handleComment}>
                <div className='tweetbox_input'>
                    <Avatar src='' />
                    <textarea
                        type="text"
                        placeholder="Type your comment here:"
                        value={tweet}
                        onChange={(e) => setTweet(e.target.value)}
                    />
                </div>
                <div className="input_container">
                    <input className='input_hashtag'
                        type="text"
                        placeholder="Type your hashtags"
                        value={tags}
                        onChange={handleTagChange}
                    />
                    {suggestions.length > 0 && (
                        <ul className='suggestions'>
                            {suggestions.map((suggestion, index) => (
                                <li key={index} onClick={() => addSuggestion(suggestion)}>
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <div className="butang-position">
                    <button className='butang' type="submit"> Tweet </button>
                </div>
            </form>
        </div>
    );
}

export default Comment;

{/* <div className = 'tweetBox'>
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
        </div> */}
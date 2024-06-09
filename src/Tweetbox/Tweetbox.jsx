import React, { useState } from "react";
import "./Tweetbox.css";
import axios from 'axios';
import { Avatar, Button } from '@mui/material';
import predefinedHashtags from './hashtags.json';   

function Tweetbox({ addPost }) {
    const [tweet, setTweet] = useState('');
    const [tags, setTags] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    

    const handleTweet = async (e) => {
        e.preventDefault();

        if (!tweet.trim()) {
            setErrorMessage('Tweet content is required');
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
       
        const tagArray = tags.split(" ").filter(tag => tag.trim() !== "");
        const postTweet = {content: tweet,userId: user.id, hashtags: tagArray };
        
        //send the data to the database
        try {
            console.log(tagArray)
            const response = await axios.post('http://localhost:8080/tweets/post', postTweet, {
                headers: {
                    'Content-Type': 'application/json',
                },  
            });

            if (response.status === 200) {
                console.log("tweet added!")
                addPost(user.username, tweet, tags);
            } else {
                // Handle registration failure (e.g., show an error message)
                console.log('???');
            }
        } catch (error) {
            console.log("you fucking failed")
            console.error('Error:', error);
        }


        setTweet("");
        setTags("");
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

    return (
        <div className='tweetBox'>
            {/* change data here brother v */}
            <form onSubmit={handleTweet}>
                <div className='tweetbox_input'>
                    <Avatar src='' />
                    <textarea
                        type="text"
                        placeholder="Type your tweet here:"
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

export default Tweetbox;

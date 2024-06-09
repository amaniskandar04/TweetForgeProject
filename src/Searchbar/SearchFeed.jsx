import './SearchFeed.css'
import Box from '../Homescreen/Box.jsx';
import Post from '../Post/Post.jsx'
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function SearchFeed() {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const handleClick = (post) => {

        navigate('/post', { state: { username: post.username, text: post.text, tags: post.tags } });
    }



    const handleSearch = async () =>{

        const searchFromDatabase = {keyword:search}
        try{
            const response = await axios.post('http://localhost:8080/tweets/search',searchFromDatabase);

            if(response.status === 200){
                const tweetData = response.data;

                setPosts(tweetData)
            }
        }catch (error) {
            // Handle error
            console.error('Error:', error);
        }
    }

    const deletePost = (tweetId) => {
        
        

        setPosts(posts.filter(post => post.tweetId !== tweetId));
    };



    const numberOfLikes = (post) => {
        return Array.isArray(post.likeUserIds) ? post.likeUserIds.length : 0;
    }

    return (
        <div className='profile'>
            <div className='profile__header'>
                <h2>Search</h2>
            </div>

            <div className='profile__header'>
                <h3 className='search__label'>Search:</h3>
                <input type='text' placeholder='Search' value={search} onChange={(event) => setSearch(event.target.value)} />
                <button type="submit" onClick={handleSearch}>Search</button>
            </div>





            {posts.map((post) => (
                <Post 
                key={post.tweetId} 
                userId = {post.userId}
                tweetId={post.tweetId} 
                username={post.username} 
                text={post.content + (Array.isArray(post.hashtags) ? ' ' + post.hashtags.join(' ') : '')}
                numOflikes = {numberOfLikes(post)} 
                onClick={()=> handleClick(post)} 
                deletePost={deletePost}>
                    
                </Post>
            ))}



        </div>
    );
}

export default SearchFeed
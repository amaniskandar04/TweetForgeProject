import './SearchFeed.css'
import Box from '../Homescreen/Box.jsx';
import Post from '../Post/Post.jsx'
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingBarReal from '../Homescreen/LoadingBarReal.jsx';   


function SearchFeed() {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [emptyPost, setEmptyPost] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate(); 
    const [errorMessage, setErrorMessage] = useState('');
    const handleClick = (post) => {

        const numOflikes = numberOfLikes(post);
        navigate(`/comments/${post.tweetId}`, { state: { userId :post.userId,username: post.username, text: post.content, tags: post.hashtags, numOflikes, statusDelete: post.statusDelete} });
    }



    const handleSearch = async () =>{
        
        if (!search.trim()) {
            setPosts([]);
            setErrorMessage('Search keyword is required');
            console.log(errorMessage);
            return;
        }
        setEmptyPost(false);
        setErrorMessage('');
        setIsLoading(true);
        const searchFromDatabase = {keyword:search}
        try{
            const response = await axios.post('http://localhost:8080/tweets/search',searchFromDatabase);

            if(response.status === 200){
                const tweetData = response.data;
                
                if(tweetData.length !== 0){
                    setIsLoading(false);
                    setEmptyPost(false);
                    setPosts(tweetData);
                }else{
                    setIsLoading(false);
                    setEmptyPost(true);
                    setPosts([]);
                    // const newPost = {
                    //     tweetId: (posts.length + 1).toString().padStart(2, '0'),
                    //     username: " ",
                    //     content: "Can't find your search!",
                        
                    // };

                    // setPosts([newPost]);

                    //how to return a div here says that cant find your search instead of 
                }
                console.log("EMPTY POST",emptyPost);
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

    useEffect(() =>{
        
    },[])

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
            {errorMessage && <div className="error-message" style={{marginTop:'20px'}}>{errorMessage}</div>}
            {emptyPost && <div className="error-message" style={{marginTop:'20px'}}>No results for "{search}"</div>}


        </div>
    );
}

export default SearchFeed
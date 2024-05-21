import React, { useEffect} from 'react';



import '../index.css';
import Post from '../Post/Post.jsx'
import Comment from '../Comment/Comment.jsx';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';


function SinglePost() {
  
  const location = useLocation();
  const { username, text, tags } = location.state || {};


  const [posts, setPosts] = useState([]);
  
  const addTweet = (username, text, tags) => {
    const newPost = {
        username,
        text,
        tags,
    };
    setPosts([newPost, ...posts]);
};

  return(
    <>
      <div className = 'feed'>
            <div className = 'feed__header'>
                <h2> Post </h2>              
            </div>
            
            
            <Post username = {username} text = {text+' '+tags}/>
            
            <Comment addTweet={addTweet}/>
            {posts.map((post, index) => (
                <Post key={index} username={post.username} text={post.text+' '+post.tags} />
            ))}
            
        </div>
    </>
  );
}

export default SinglePost;
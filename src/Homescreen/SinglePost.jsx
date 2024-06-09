import React, { useEffect } from 'react';
import '../index.css';
import Post from '../Post/Post.jsx'
import Comment from '../Comment/Comment.jsx';
import { useLocation, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function SinglePost() {
  const { id } = useParams();

  const location = useLocation();
  const { userId, username, text, tags, numOflikes } = location.state || {};
  const navigate = useNavigate();



  const [posts, setPosts] = useState([]);

  const addTweet = (username, text, tags) => {
    const newPost = {
      username,
      text,
      tags,
    };
    setPosts([newPost, ...posts]);
    fetchCommentData();
  };

  //clicking on the comments down below
  const handleClick = (post) => {

    const id = 'test';
    setPosts([]);
    navigate(`/comments/${post.commentId}`, { state: { userId: post.userId ,username: post.username, text: post.content, tags: post.hashtags } });

  };

  //fetch the comments from the database
  const fetchCommentData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/tweets/byParentId/${id}`);

      if (response.status === 200) {

        const tweetData = response.data;

        setPosts(tweetData)

        console.log("Data: ", posts)
      } else {
        // Handle unsuccessful response
        console.log('Failed to fetch tweet');
      }
    } catch (error) {
      // Handle error
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchCommentData();
  }, [id]);

  const numberOfLikes = (post) => {
    return Array.isArray(post.likeUserIds) ? post.likeUserIds.length : 0;
  }

  const deletePost = (tweetId) => {



    setPosts(posts.filter(post => post.commentId !== tweetId));
  };

  const deleteComment = (tweetId) => {
    
  };



  return (
    <>
      <div className='feed'>
        <div className='feed__header'>
          <h2> Post </h2>
        </div>

        
        <Post
          userId={userId}
          username={username}
          text={text + (Array.isArray(tags) ? ' ' + tags.join(' ') : '')}
          numOflikes={numOflikes}
          deletePost={deleteComment}>
        </Post>

        <Comment addTweet={addTweet} />
        {posts.map((post) => (
          <Post
            key={post.commentId}
            userId={post.userId}
            tweetId={post.commentId}
            username={post.username}
            text={post.content + (Array.isArray(post.hashtags) ? ' ' + post.hashtags.join(' ') : '')}
            numOflikes={numberOfLikes(post)}
            onClick={() => handleClick(post)}
            deletePost={deletePost}>

          </Post>
        ))}

      </div>
    </>
  );
}

export default SinglePost;
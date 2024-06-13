import './ProfileFeed.css'
import Box from '../Homescreen/Box.jsx';
import ProfileBox from './ProfileBox.jsx'
import Post from '../Post/Post.jsx'
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LoadingBarReal from '../Homescreen/LoadingBarReal.jsx';

function ProfileFeed() {
    const [posts, setPosts] = useState([]);
    const { id } = useParams();
    const [activeButton, setActiveButton] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [profileExist, setProfileExist] = useState(false);

    const navigate = useNavigate();

    const addPost = (username, text, tags) => {
        const newPost = {
            username,
            text,
            tags,
        };

        setPosts([newPost, ...posts]);
    };



    //tukar comment kat sini

    const handleClick = (post) => {
        if (post.parentId) {
            console.log(post);
        }
        const numOflikes = numberOfLikes(post);
        navigate(`/comments/${post.tweetId}`, { state: { userId: post.userId, username: post.username, text: post.content, tags: post.hashtags, numOflikes, statusDelete: post.statusDelete } });
    }

    const numberOfLikes = (post) => {
        return Array.isArray(post.likeUserIds) ? post.likeUserIds.length : 0;
    }

    const fetchPosts = async () => {
        const user = { username: id };
        try {
            const response = await axios.post('http://localhost:8080/tweets/getAllPersonalTweets', user);
            if (response.status === 200) {
                setIsLoading(false);
                setPosts(response.data);
            } else {
                console.log('Failed to fetch posts');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchComments = async () => {
        const user = { username: id };
        try {
            const response = await axios.post('http://localhost:8080/tweets/getAllPersonalComments', user);
            if (response.status === 200) {
                setIsLoading(false);
                setPosts(response.data);
            } else {
                console.log('Failed to fetch comments');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    
    useEffect(() => {
        if (profileExist) {
            if (activeButton === 0) {
                setIsLoading(true);
                fetchPosts();
            } else {
                setIsLoading(true);
                fetchComments();
            }
        } else {
            console.log("I am the problem");
        }
        console.log("Profile page: " + id);
    }, [profileExist, activeButton]);

    const deletePost = (tweetId) => {

        if(activeButton === 1){
            setPosts(posts.filter(post => post.commentId !== tweetId));
        }else{
            setPosts(posts.filter(post => post.tweetId !== tweetId));
        }

        
    };

    const handleClickComment = async (post) => {
        const id = 'test';
        setPosts([]);


        //from post, get the parentId to fetch the parent post data, then display the parent post 
        const parentId = post.parentId;
        const response = await getSingleTweet(parentId);
        //if the comment parent is tweet
        if(response.tweetId !== null){

            console.log("tweet: "+response);

            navigate(`/comments/${parentId}`, { state: { userId: response.userId, username: response.username, text: response.content, tags: response.hashtags, statusDelete: response.statusDelete } });
        }else if(response.commentId !== null){

            //if the comment parent is a comment
            console.log("comment: "+response);

            navigate(`/comments/${parentId}`, { state: { userId: response.userId, username: response.username, text: response.content, tags: response.hashtags, statusDelete: response.statusDelete } });
        }
        
    }

    const getSingleTweet = async (parentId) => {

        try{
            const response = await axios.get(`http://localhost:8080/tweets/getTweet/${parentId}`);
            if(response.status === 200){
                console.log("Single post received!");
                return response.data;
            }else{
                console.log("Connection error prolly");
            }
        }catch(err){
            console.error(err);
        }
    }


    return (
        <div className='profile'>
            <div className='profile__header'>
                <ArrowBackIcon />
                <h2> Profile Name </h2>
            </div>

            <ProfileBox setActiveButton={setActiveButton} activeButton={activeButton} setProfileExist={setProfileExist} />


            {/* {posts.map((post, index) => (
                <Post key={index} userId = {post.userId} username={id} text={post.content+' '+post.hashtags} onClick={()=> handleClick(post)} deletePost={deletePost}/>
            ))}  */}


            {isLoading ? (
                <LoadingBarReal />
            ) : (
                // Render posts if isLoading is false
                activeButton === 1 ? (
                    posts.map((post) => (
                        <Post
                            key={post.commentId}
                            userId={post.userId}
                            tweetId={post.commentId}
                            username={post.username}
                            text={post.content + (Array.isArray(post.hashtags) ? ' ' + post.hashtags.join(' ') : '')}
                            numOflikes={numberOfLikes(post)}
                            onClick={() => handleClickComment(post)} //need to handle the case when the comment is actually a comment of comment.
                            deletePost={deletePost}
                            isComment={true}>

                        </Post>
                    ))
                ) : (
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


                )
            )}



        </div>
    );
}

export default ProfileFeed
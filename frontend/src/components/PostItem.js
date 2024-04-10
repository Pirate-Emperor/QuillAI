import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PostItem = ({ post }) => {
    const [likes, setLikes] = useState(0);
    const [views, setViews] = useState(0);

    useEffect(() => {
        const fetchPostStats = async () => {
            setViews(Math.floor(Math.random() * 100) + 1);
            try {
                const response = await axios.get(`/api/posts/${post.post_id}/stats`);
                setLikes(response.data.likes);
                setViews(response.data.views);
            } catch (error) {
                setLikes(Math.floor(Math.random() * 50) + 1);
                console.error('Error fetching post stats:', error);
            }
        };
        fetchPostStats();
    }, [post.post_id]);

    const handleLike = async () => {
        try {
            await axios.post(`/api/posts/${post.post_id}/like`);
            setLikes(likes + 1);
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };

    return (
        <li className="post">
            <Link to={`/post/${post.post_id}`} className='link_post'>
                {post.title}
            </Link> <br/>
            | {post.content.slice(0, 500)} 
            {post.content.length > 500 && ' ...'}  <br/># {post.category}
            <div>
                <button onClick={handleLike}>Like: {likes}</button>
                <span>Views (on page): {views}</span>
            </div>
        </li>
    );
};

export default PostItem;
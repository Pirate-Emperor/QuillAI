import React from 'react';
import PostItem from './PostItem';

const PostList = ({ posts }) => {
    return (
        <ul className="posts">
            {posts.map(post => (
                <PostItem key={post._id} post={post} />
            ))}
        </ul>
    );
};

export default PostList;

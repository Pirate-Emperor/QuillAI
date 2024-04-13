import React from 'react';
import { Link } from "react-router-dom";

const SearchResults = ({ posts }) => {
    return (
        <div className="IndexAllPosts">
            {posts.length > 0 && ( <>
                <h2>Search Results</h2>
                <ul>{posts.map((post) => (
                    <li key={post._id}> 
                        <Link to={`/post/${post.post_id}`} className='link_post'>
                            {post.title}
                        </Link> <br/> | {post.content} <br/># {post.category}
                    </li>))}
                </ul>
            </> )}
        </div>
    );
};

export default SearchResults;

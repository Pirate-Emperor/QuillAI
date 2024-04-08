import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import config from "../config";
import loadingGif from "../ayanami_loading.gif";
import CategoryWidget from "./CategoryWidget";
import { Link } from "react-router-dom";

const CategoryPage = () => {
    const { category } = useParams();
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);  

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await config.axios_b.get(`/category/${category}`);
                setPosts(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
        fetchPosts();
    }, [category]
);
    return (
        <div className="container-n IndexPage">
        <CategoryWidget />
        <div className="IndexAllPosts">
            <h1>Posts in {category}.</h1>
            {isLoading ? (
                <img src={loadingGif} alt="Loading..." />
            ) : (
            <ul className="posts">
                {posts.map((post) => (
                    <li key={post._id} className="post"> 
                        <Link key={post.post_id} to={`/post/${post.post_id}`} className='link_post'>
                            {post.title}
                        </Link> <br/>
                    | {post.content.slice(0, 500)} 
                    {post.content.length > 500 && ' ...'}  <br/># {post.category}
                    </li>
                ))}
            </ul>  )}
        </div></div>
    );
};
export default CategoryPage;

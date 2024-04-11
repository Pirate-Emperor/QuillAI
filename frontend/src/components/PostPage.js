import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import config from '../config';
import loadingGif from '../ayanami_loading.gif';
import rehypeRaw from "rehype-raw";

const PostPage = () => {
  const { post_id } = useParams(); // get the post ID from the URL
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    const fetchData = async () => { 
      const response = await config.axios_b.get(`/posts/${post_id}`); // fetch post data by ID
      const data = response.data;
      setPostData(data);
    };
    fetchData();
  }, [post_id]);
  // <> </> is React Fragment, for fast rendering page
  // TODO: loading animation on full page
  if (!postData) return ( 
    <> <img src={loadingGif} alt="Loading..." />
       <p>Loading...</p> </> 
  );
  return (
    <div className="PostPage">
      <h1>{postData.title}</h1>
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>{postData.content}</ReactMarkdown>
    </div>
  ); // TODO: redirect to edit page if ig_token is valid to post
};

export default PostPage;

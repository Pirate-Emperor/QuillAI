import React, { useState } from 'react';
import config from '../config';
import { Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from "rehype-raw";
import Tabs from './Tabs';
import { generateUniquePostId } from './UserHelper';
import useIframeValidation from './useIframeValidation';
import PostInput from './PostInput';

// const iframeSrc = extractIFrameSrc(content); 
const PostForm =  () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  
  // by allowed domains and iframe src, then check every 2-5 seconds
  useIframeValidation(content, isChecking, setIsChecking); 

  const handleInputChange = (event) => {
    setContent(event.target.value);
    setIsChecking(true); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const post_id = await generateUniquePostId(); 
    // TODO: generate ig_token access, save in DB and cookies
    try {
      const response = await config.axios_b.post('/posts/', {
        post_id, title, content, category, 
      });
      console.log('Post creation response:', response.data); // dev
      return <Navigate to={`/post/${post_id}`} />;
  
    } catch (error) {
      console.error('Error creating post:', error); // dev
      alert("Error creating post: " + error);
    }
  };
  // react fragments here only for readability
  return (
  <Tabs>
    <PostInput title={title} setTitle={setTitle} handleSubmit={handleSubmit}
    content={content} setContent={setContent} category={category} 
    setCategory={setCategory} handleInputChange={handleInputChange} />
    <div className='PostForm-preview'>
      <h1>Preview content (markdown support)</h1>
      <ReactMarkdown  rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
    </div>
    </Tabs>
  );
};

export default PostForm;

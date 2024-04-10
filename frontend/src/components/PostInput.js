import React from 'react';

const PostInput = ({ title, setTitle, content, setContent, 
    category, setCategory, handleInputChange , handleSubmit }) => {
    return (
        <div className='PostForm'>
            <h1>Create Post</h1>
            <h3>Remember that your post will be public only after moderation by AI and signatures.</h3>
            <form onSubmit={handleSubmit}>
                <>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" value={title} 
                    onChange={(e) => setTitle(e.target.value)} required />
                </>
                <>
                    <label htmlFor="content">Content:</label>
                    <textarea id="content" value={content} 
                    onChange={handleInputChange} required />
                </>
                <>
                    <label htmlFor="category">Category:</label>
                    <input type="text" id="category" value={category}
                    onChange={(e) => setCategory(e.target.value)} required />
                </>
            </form>
        </div>
    );
};

export default PostInput;

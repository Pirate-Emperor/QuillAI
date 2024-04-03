const express = require('express');
const app = express();
const postsRouter = require('./routes/posts');

app.use('/api/posts', postsRouter);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
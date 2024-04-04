const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/:postId/stats', async (req, res) => {
    try {
        const postId = req.params.postId;
        const [row] = await db.query('SELECT likes, views FROM post_stats WHERE post_id = ?', [postId]);
        res.json(row);
    } catch (error) {
        console.error('Error fetching post stats:', error);
        res.status(500).json({ error: 'Error fetching post stats' });
    }
});

router.post('/:postId/like', async (req, res) => {
    try {
        const postId = req.params.postId;
        await db.query('UPDATE post_stats SET likes = likes + 1 WHERE post_id = ?', [postId]);
        res.json({ message: 'Post liked' });
    } catch (error) {
        console.error('Error liking post:', error);
        res.status(500).json({ error: 'Error liking post' });
    }
});

module.exports = router;
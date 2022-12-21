const router = require("express").Router();
const { User, Follower, Post, Comment } = require('../models');

router.get('/', async (req,res) => {
    try {
        
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/login', async (req,res) => {
    try {
        
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;



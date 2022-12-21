const router = require("express").Router();
const { User, Follower, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

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

router.get('/dashboard', withAuth, async (req,res) => {
    try {
        
    } catch (error) {
        res.status(500).json(error);
    }
});

// I think /user should be for the current user's profile page. Which is different from their dashboard view.
router.get('/user', withAuth, async (req,res) => {
    try {
        
    } catch (error) {
        res.status(500).json(error);
    }
});


// With the above being true, user by id can be the endpoint for viewing other people's profiles. I'm including withAuth to encourage new users by only allowing signed-in users to view full profiles.
router.get('/user/:id', withAuth, async (req,res) => {
    try {
        
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;



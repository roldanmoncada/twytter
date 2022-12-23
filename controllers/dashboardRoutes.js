const router = require('express').Router();
const { User, Follower, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req,res) => {
    try {
        const dbPostData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: [
                'id',
                'title',
                'created_at',
                'post_content'
            ],
            include: [
                {
                    model: Comment,
                    attributes: [
                        'id',
                        'comment_text',
                        'post_id',
                        'user_id',
                        'created_at'
                    ],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });

        const posts = dbPostData.map(post => post.get({plain:true}));
        res.render('dashboard', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

// I think /user should be for the current user's profile page. Which is different from their dashboard view.
router.get('/user', withAuth, async (req,res) => {
    try {
        const userData = await User.findbyPK(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: User }],
        });

        const userProfile = userData.get({ plain: true });

        res.render('profile', {
            ...user,
            logged_in: true
        });
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

router.get('/create', withAuth, async (req,res) => {
    try {
        const newPostData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: [
                'id',
                'title',
                'created_at',
                'post_content'
            ],
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: [
                        'id',
                        'title',
                        'created_at',
                        'post_content'
                    ],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        });

        const posts = newPostData.map(post => post.get({ plain: true }));
        res.render('create-post', { posts, logged_in: true });
    } catch (error) {
        res.status(500).json(error)
    }
});

router.get('/user/:id', withAuth, async (req,res) => {
    try {
        
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports  = router;
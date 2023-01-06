const router = require("express").Router();
const { User, Follower, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

// //getting the dashboard page including feed
// router.get('/', withAuth, async (req,res) => {
//   try {
//       const dbPostData = await Post.findAll({
//           where: {
//               user_id: req.session.user_id
//           },
//           attributes: [
//               'id',
//               'title',
//               'created_at',
//               'body',
//               'user_id',

//           ],
//           include: [
//               {
//                   model: Comment,
//                   attributes: [
//                       'id',
//                       'body',
//                       'post_id',
//                       'user_id',
//                       'created_at'
//                   ],
//                   include: {
//                       model: User,
//                       attributes: ['name']
//                   }
//               },
//               {
//                   model: User,
//                   attributes: ['name']
//               }
//           ]
//       });

//       const posts = dbPostData.map(post => post.get({plain:true}));
//       res.render('dashboard', {
//           posts,
//           logged_in: req.session.logged_in
//       });
//   } catch (error) {
//       res.status(500).json(error);
//   }
// });

// // I think /user should be for the current user's profile page. Which is different from their dashboard view. //Heidrun: changed into /profile since there need to be /user routes for rendering json data of user data
// router.get('/profile', withAuth, async (req,res) => {
//   try {
//       const userData = await User.findByPK(req.session.user_id, {
//           attributes: { exclude: ['password'] },
//           include: [{ model: User }],
//       });

//       const userProfile = userData.get({ plain: true });

//       res.render('profile', {
//           ...user,
//           logged_in: true
//       });
//   } catch (error) {
//       res.status(500).json(error);
//   }
// });

// // With the above being true, user by id can be the endpoint for viewing other people's profiles. I'm including withAuth to encourage new users by only allowing signed-in users to view full profiles.
// router.get('/user/:id', withAuth, async (req,res) => {
//   try {

//   } catch (error) {
//       res.status(500).json(error);
//   }
// });
// //create a post page
// router.get('/create', withAuth, async (req,res) => {
//   try {
//       const newPostData = await Post.findAll({
//           where: {
//               user_id: req.session.user_id
//           },
//           attributes: [
//               'id',
//               'title',
//               'created_at',
//               'body'
//           ],
//           include: [
//               {
//                   model: User,
//                   attributes: ['name']
//               },
//               {
//                   model: Comment,
//                   attributes: [
//                       'id',
//                       'body',
//                       'created_at',
//                       'user_id'

//                   ],
//                   include: {
//                       model: User,
//                       attributes: ['name']
//                   }
//               }
//           ]
//       });

//       const posts = newPostData.map(post => post.get({ plain: true }));
//       res.render('create-post', { posts, logged_in: true });
//   } catch (error) {
//       res.status(500).json(error)
//   }
// });

router.get("/", withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ["id", "title", "post_content"],
      include: [
        {
          model: Comment,
          attributes: ["id", "comment_text", "post_id", "user_id"],
          include: {
            model: User,
            attributes: ["username", "first_name", "last_name"],
          },
        },
        {
          model: User,
          attributes: ["username", "first_name", "last_name"],
        },
      ],
    });

    const posts = dbPostData.map((post) => post.get({ plain: true }));
    res.render("dashboard", {
      posts,
      logged_in: true,

      username: req.session.username,
      first_name: req.session.first_name,
      last_name: req.session.last_name,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// getting the current user's profile page. Which is different from their dashboard view.
router.get("/user", withAuth, async (req, res) => {
  try {
    const userData = await User.findbyPK(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: User }],
    });

    const userProfile = userData.get({ plain: true });

    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// With the above being true, user by id can be the endpoint for viewing other people's profiles. I'm including withAuth to encourage new users by only allowing signed-in users to view full profiles.
router.get("/user/:id", withAuth, async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json(error);
  }
});

//getting the edit-post page
router.get("/edit/:id", withAuth, (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "post_content"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id"],
        include: {
          model: User,
          attributes: ["username", "first_name", "last_name"],
        },
      },
      {
        model: User,
        attributes: ["username", "first_name", "last_name"],
      },
    ],
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      const post = data.get({ plain: true });

      res.render("edit-post", {
        post,
        logged_in: true,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//endpoint for creating a post
router.get("/create", withAuth, async (req, res) => {
  try {
    const newPostData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ["id", "title", "post_content"],
      include: [
        {
          model: User,
          attributes: ["username", "first_name", "last_name"],
        },
        {
          model: Comment,
          attributes: ["id", "comment_text", "post_id", "user_id"],
          include: {
            model: User,
            attributes: ["username", "first_name", "last_name"],
          },
        },
      ],
    });

    const posts = newPostData.map((post) => post.get({ plain: true }));
    res.render("create-post", { posts, logged_in: true });
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/post/:id", withAuth, (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "post_content"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id"],
        include: {
          model: User,
          attributes: ["username", "first_name", "last_name"],
        },
      },
      {
        model: User,
        attributes: ["username", "first_name", "last_name"],
      },
    ],
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      const post = data.get({ plain: true });

      res.render("single-post", {
        post,
        logged_in: req.session.logged_in,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
module.exports = router;

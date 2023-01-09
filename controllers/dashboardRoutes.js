const router = require("express").Router();
const { User, Follower, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

//displaying all posts  of logged-in user, including comments
router.get("/", withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      where: {
        user_id: req.session.passport.user.user_id,
      },
      attributes: ["id", "title", "post_content", "created_at"],
      include: [
        {
          model: Comment,
          attributes: [
            "id",
            "comment_text",
            "post_id",
            "user_id",
            "created_at",
          ],
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

     
    const dbUserData = await User.findOne({
      //raw: true,
      where: {
        id: req.session.passport.user.user_id,
      },

      include: [
        {
          all: true,
          nested: true,
          include: [
            {
              all: true,
              nested: true,
            },
          ],
        },
      ],
    });
    console.log("dbUserData is = ", dbUserData);
    const followers = dbUserData.followers.map((e) => {
      return {
        first_name: e.dataValues.user_follower.dataValues.first_name,
        last_name: e.dataValues.user_follower.dataValues.last_name,
      };
    });
    const following = dbUserData.following.map((e) => {
      return {
        first_name: e.dataValues.user_follower.dataValues.first_name,
        last_name: e.dataValues.user_follower.dataValues.last_name,
      };

      attributes: ["following_id", "user_id"],
      //   include: [
      //     {
      //       model: User,
      //       attributes: ["username", "first_name", "last_name"],
      //     },
      //   ],
    });

    console.log("follower data= ", dbFollowerData);
    //making simple array of user IDs
    const followers = dbFollowerData.map((e) => e.user_id);

    //getting from db all that are being followed
    const dbFollowingData = await Follower.findAll({
      //raw: true,
      where: {
        user_id: req.session.passport.user.user_id,
      },
      attributes: ["id", "following_id", "user_id"],
      //   include: [
      //     {
      //       model: User,
      //       attributes: ["username", "first_name", "last_name"],
      //     },
      //   ],

    });
    console.log("db following =", following);

    //rendering all info in dashboard
    res.render("dashboard", {
      posts,
      logged_in: true,
      username: req.session.passport.user.username,
      first_name: req.session.passport.user.first_name,
      last_name: req.session.passport.user.last_name,
      followers: followers,
      following: following,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// getting the current user's profile page. Which is different from their dashboard view (frontend code missing? )
router.get("/user", withAuth, async (req, res) => {
  try {
    const userData = await User.findbyPK(req.session.passport.user.user_id, {
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

//getting the edit-post endpoint
router.get("/edit/:id", withAuth, (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "post_content", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
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
        user_id: req.session.passport.user.user_id,
      },
      attributes: ["id", "title", "post_content", "created_at"],
      include: [
        {
          model: User,
          attributes: ["username", "first_name", "last_name"],
        },
        {
          model: Comment,
          attributes: [
            "id",
            "comment_text",
            "post_id",
            "user_id",
            "created_at",
          ],
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
    attributes: ["id", "title", "post_content", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
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
        logged_in: req.session.passport.user.logged_in,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
module.exports = router;

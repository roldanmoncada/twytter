const router = require("express").Router();
const { User, Follower, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

// router.get("/", async (req, res) => {
//   try {
//     // I think it would make more sense to have this here instead of the /login route. Because having it here will make it effectively impossible for the session to be logged in when accessing the /login endpoint.
//     if (!req.session.logged_in) {
//       res.redirect("/dashboard");
//       return;
//     }
//     res.render("home");
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// router.get("/login", (req, res) => {
//   // Removed the chunk about redirecting to the dashboard if already logged in since it makes more sense to check in the above block.

//   // since the login check is handled above, this would be all we need to do with the login route to my knowledge.
//   res.render("login");
// });

router.get("/", async (req, res) => {
  try {
    // I think it would make more sense to have this here instead of the /login route. Because having it here will make it effectively impossible for the session to be logged in when accessing the /login endpoint.
    const dbPostData = await Post.findAll({
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
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/login", (req, res) => {
  // Removed the chunk about redirecting to the dashboard if already logged in since it makes more sense to check in the above block.

  // since the login check is handled above, this would be all we need to do with the login route to my knowledge.
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

module.exports = router;

const router = require("express").Router();
const { User, Follower, Post, Comment } = require("../models");

router.get("/", async (req, res) => {
  try {
    // I think it would make more sense to have this here instead of the /login route. Because having it here will make it effectively impossible for the session to be logged in when accessing the /login endpoint.
    if (!req.session.logged_in) {
      res.redirect("/dashboard");
      return;
    }
    res.render("home");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/login", (req, res) => {
  // Removed the chunk about redirecting to the dashboard if already logged in since it makes more sense to check in the above block.

  // since the login check is handled above, this would be all we need to do with the login route to my knowledge.
  res.render("login");
});

module.exports = router;
